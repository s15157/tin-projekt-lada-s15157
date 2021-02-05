const db = require('../../config/mysql2/db');
const carSchema = require('../../model/joi/Car');

exports.getCar = () => {
    return db.promise().query('SELECT * FROM Car')
    .then( (results, fields) => {
        return results[0];
    })
    .catch(err => {
        throw err;
    });
};

exports.getCarById = (carId) => {
    const query = `SELECT car._id as _id, car.brand, car.model, car.engine, car.power, car.type, car.price, car.bail, rent._id as rent_id, rent.dateFrom, rent.dateTo, rent.car_id, rent.customer_id, c._id as c_id, c.firstName, c.lastName, c.email, c.pesel
    FROM Car car 
    left join Rent rent on rent._id = car._id
    left join Customer c on rent._id = c._id 
    where car._id = ?`
return db.promise().query(query, [carId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const car = {
            _id: parseInt(carId),
            brand: firstRow.brand,
            model: firstRow.model,
            engine: firstRow.engine,
            power: firstRow.power,
            type: firstRow.type,
            price: firstRow.price,
            bail: firstRow.bail,
            rents: []
        }

        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.rent_id) {
                const rent = {
                    _id: row.rent_id,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    customer: {
                        _id: row.c_Id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email,
                        pesel: row.pesel,
                    }
                };
                car.rents.push(rent);
            }
        }
        return car;
    })
    .catch(err => {
        throw err;
    });
};

exports.createCar = (newCarData) => {

    const vRes = carSchema.validate(newCarData, { abortEarly: false} );
    if(vRes.error) {
      return Promise.reject(vRes.error);
    }

    const brand = newCarData.brand;
    const model = newCarData.model;
    const engine = newCarData.engine;
    const power = newCarData.power;
    const type = newCarData.type;
    const price = newCarData.price;
    const bail = newCarData.bail;
    const sql = 'INSERT into Car (brand, model, engine, power, type, price, bail) VALUES (?, ?, ?, ?, ?, ?, ?)'
    return db.promise().execute(sql, [brand, model, engine, power, type, price, bail]);
};

exports.updateCar = (carId, carData) => {

    const vRes = carSchema.validate(carData, { abortEarly: false} );
    if(vRes.error) {
      return Promise.reject(vRes.error);
    }

    const brand = carData.brand;
    const model = carData.model;
    const engine = carData.engine;
    const power = carData.power;
    const type = carData.type;
    const price = carData.price;
    const bail = carData.bail;
    const sql = `UPDATE Car set brand = ?, model = ?, engine = ?, power = ?, type = ?, price = ?, bail = ? where _id = ?`;
    return db.promise().execute(sql, [brand, model, engine, power, type, price, bail, carId]);
};

exports.deleteCar = (carId) => {
    const sql1 = 'DELETE FROM Rent where car_id = ?'
    const sql2 = 'DELETE FROM Car where _id = ?'
    
    return db.promise().execute(sql1, [carId])
        .then(() => {
            return db.promise().execute(sql2, [carId])
        });
};