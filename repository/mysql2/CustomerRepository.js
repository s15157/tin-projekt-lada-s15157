const db = require('../../config/mysql2/db');
const customerSchema = require('../../model/joi/Customer');

exports.getCustomer = () => {
    return db.promise().query('SELECT * FROM Customer')
    .then( (results, fields) => {
        console.log("jestem3");
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getCustomerById = (customerId) => {
    const query = `SELECT c._id as _id, c.firstName, c.lastName, c.email, c.pesel, rent._id as rent_id,
        rent.dateFrom, car._id as car_id, rent.dateTo, car.brand, car.model, car.engine, car.power, car.type, car.price, car.bail 
    FROM Customer c 
    left join Rent rent on rent._id = c._id
    left join Car car on rent._id = car._id 
    where c._id = ?`
return db.promise().query(query, [customerId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return firstRow;
        }
        const customer = {
            _id: parseInt(customerId),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            email: firstRow.email,
            pesel: firstRow.pesel,
            rents: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.rent_id) {
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
                    }
                };
                customer.rents.push(rent);
            }
        }
        return customer;
    })
    .catch(err => {
        throw err;
    });
};

exports.createCustomer = (newCustomerData) => {

    const vRes = customerSchema.validate(newCustomerData, { abortEarly: false} );
    if(vRes.error) {
      return Promise.reject(vRes.error);
    }
    
    const firstName = newCustomerData.firstName;
    const lastName = newCustomerData.lastName;
    const email = newCustomerData.email;
    const pesel = newCustomerData.pesel;
    const sql = 'INSERT into Customer (firstName, lastName, email, pesel) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email, pesel]);
};

exports.updateCustomer = (customerId, customerData) => {

    const vRes = customerSchema.validate(customerData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    
    const firstName = customerData.firstName;
    const lastName = customerData.lastName;
    const email = customerData.email;
    const pesel = customerData.pesel;
    const sql = `UPDATE Customer set firstName = ?, lastName = ?, email = ?, pesel = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, email, pesel, customerId]);
};

exports.deleteCustomer = (customerId) => {
    const sql1 = 'DELETE FROM Rent where customer_id = ?'
    const sql2 = 'DELETE FROM Customer where _id = ?'
    
    return db.promise().execute(sql1, [customerId])
        .then(() => {
            return db.promise().execute(sql2, [customerId])
        });
};

exports.findByEmail = (email) => {

    const sql ='SELECT * FROM Customer WHERE email = ?';

    return db.promise().query(sql, [email])
    .then( (results, fields) => {
        return results[0];
    })
    .catch(err => {
        throw err;
    });
};