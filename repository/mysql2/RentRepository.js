const db = require('../../config/mysql2/db');
// const rentSchema = require('../../model/joi/Rent');

exports.getRent = () => {
    const query = `SELECT rent._id as rent_id, rent.dateFrom, rent.dateTo, car._id as car_id, car.brand, 
        car.model, car.engine, car.power, car.type, car.price, car.bail, c._id as customer_id, c.firstName, c.lastName, c.email, c.pesel
        FROM Rent rent 
        left join Customer c on rent.customer_id = c._id
        left join Car car on rent.car_id = car._id`
    return db.promise().query(query)
        .then( (results, fields) => {
            const rents = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                const rent = {
                    _id: row.rent_id,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    car: {
                        _id: row.car_id,
                        brand: row.brand,
                        model: row.model,
                        engine: row.engine,
                        power: row.power,
                        type: row.type,
                        price: row.price,
                        bail: row.bail
                    },
                    customer: {
                        _id: row.customer_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email,
                        pesel: row.pesel
                    }
                };
                rents.push(rent);
            }
            console.log(rents);
            return rents;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getRentById = (rentId) => {
    const query = `SELECT rent._id as rent_id, rent.dateFrom, rent.dateTo, car._id as car_id, car.brand, 
        car.model, car.engine, car.power, car.type, car.price, car.bail, c._id as customer_id, c.firstName, c.lastName, c.email, c.pesel
        FROM Rent rent 
        left join Customer c on rent.customer_id = c._id
        left join Car car on rent.car_id = car._id
        where rent._id = ?`
    return db.promise().query(query, [rentId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            const rent = {
                _id: row.rent_id,
                dateFrom: row.dateFrom,
                dateTo: row.dateTo,
                car: {
                    _id: row.car_id,
                    brand: row.brand,
                    model: row.model,
                    engine: row.engine,
                    power: row.power,
                    type: row.type,
                    price: row.price,
                    bail: row.bail
                },
                customer: {
                    _id: row.customer_id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    pesel: row.pesel
                }
            };
            console.log(rent);
            return rent;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createRent = (data) => {
    
    // const vRes = rentSchema.validate(data, { abortEarly: false} );
    // if(vRes.error) {
    //     console.log("tutaj");
    //   return Promise.reject(vRes.error);
    // }

    const str = data.car_id;
    const strs = str.split(',');

    const sql = 'INSERT into Rent (customer_id, car_id, dateFrom, dateTo, price, bail) VALUES (?, ?, ?, ?, ?, ?)';
    return db.promise().execute(sql, [data.customer_id, strs[0], data.dateFrom, data.dateTo, strs[1], strs[2]]);
};

exports.updateRent = (rentId, rentData) => {

    // const vRes = rentSchema.validate(rentData, { abortEarly: false} );
    // if(vRes.error) {
    //   return Promise.reject(vRes.error);
    // }

    const customerId = rentData.customerId;
    const carId = rentData.carId;
    const dateFrom = rentData.dateFrom;
    const dateTo = rentData.dateTo ? rentData.dateTo : null;
    const price = rentData.price;
    const bail = rentData.bail;


    const sql = `UPDATE Rent set customer_id = ?, car_id = ?, dateFrom = ?, dateTo = ?, price = ?, bail = ? where _id = ?`;
    return db.promise().execute(sql, [customerId, carId, dateFrom, dateTo, price, bail, rentId]);
}

exports.deleteRent = (rentId) => {
    const sql = 'DELETE FROM Rent where _id = ?'
    return db.promise().execute(sql, [rentId]);
}

exports.deleteManyRents = (rentIds) => {
    const sql = 'DELETE FROM Rent where _id IN (?)'
    return db.promise().execute(sql, [rentIds]);
}