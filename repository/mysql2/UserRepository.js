const db = require('../../config/mysql2/db');
const userSchema = require('../../model/joi/Register');
const authUtil = require('../../util/authUtil');

exports.getUser = () => {
    return db.promise().query('SELECT * FROM User')
    .then( (results, fields) => {
        return results[0];
    })
    .catch(err => {
        throw err;
    });
};

exports.getUserById = (userId) => {
    const query = `SELECT u._id as _id, u.firstName, u.lastName, u.email, u.password, u.type
    FROM User u  
    where u._id = ?`
return db.promise().query(query, [userId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return firstRow;
        }
        const user = {
            _id: parseInt(userId),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            email: firstRow.email,
            password: firstRow.password,
            type: firstRow.type
        }
        
        return user;
    })
    .catch(err => {
        throw err;
    });
};

exports.createUser = (newUserData) => {

    const vRes = userSchema.validate(newUserData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(newUserData.email)
        .then(emailErr => {
            if (emailErr) {
                return Promise.reject(emailErr);
            } else {
                const firstName = newUserData.firstName;
                const lastName = newUserData.lastName;
                const email = newUserData.email;
                const password = authUtil.hashPassword(newUserData.password);
                const type = "user";
                const sql = 'INSERT into User (firstName, lastName, email, password, type) VALUES (?, ?, ?, ?, ?)'
                return db.promise().execute(sql, [firstName, lastName, email, password, type]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });

};

exports.updateUser = (userId, userData) => {

    const vRes = userSchema.validate(userData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }

    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    var password = userData.password;
    const type = userData.type;
    
    const sql = 'UPDATE User set firstName = ?, lastName = ?, email = ?, password = ?, type = ? where _id = ?';
    return db.promise().execute(sql, [firstName, lastName, email, password, type, userId]);
};

exports.deleteUser = (userId) => {
    const sql = 'DELETE FROM User where _id = ?'
    
    return db.promise().execute(sql, [userId]);
};

exports.findByEmail = (email) => {

    const sql ='SELECT * FROM User WHERE email = ?';

    return db.promise().query(sql, [email])
    .then( (results, fields) => {
        return results[0];
    })
    .catch(err => {
        throw err;
    });
};

checkEmailUnique = (email, userId) => {
    let sql, promise;
    
        sql ='SELECT COUNT(1) as u FROM User where email = ?';
        promise = db.promise().query(sql, [email]);
    
    return promise.then( (results, fields) => {
        const count = results[0][0].u;
        let err = null;
        if(count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }
        return err;
    });
}