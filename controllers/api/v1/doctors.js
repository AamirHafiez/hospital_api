const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

// registration
module.exports.register = async function(req, res){
    try {
        // find doctor accoding to email
        let doctor = await Doctor.findOne({email: req.body.email});
        if(doctor){ // if doctor is found in db don't register
            return res.json(409, {
                message: 'User already Exists!!'
            });
        }else{ // if doctor is not found in db create account
            await Doctor.create(req.body);
            return res.json(200, {
                message: 'User account created!!'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}

// login
module.exports.login = async function(req, res){
    try {
        // find doctor according to email
        let doctor = await Doctor.findOne({email: req.body.email});
        // if doctor is not found or password doesn't match with the doctors account then error msg
        if(!doctor || doctor.password != req.body.password){
            return res.json(422, {
                message: 'Invalid username/password!!'
            });
        }else{ // else if email and password match then login
            return res.json(200, {
                message: 'Sign In successfull',
                data: {
                    // create a json web token having a secret and expiry time
                    token: jwt.sign(doctor.toJSON(), 'secret', {expiresIn: '100000s'})
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}