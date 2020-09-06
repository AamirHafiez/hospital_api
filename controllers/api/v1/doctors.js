const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

// registration
module.exports.register = async function(req, res){
    try {
        let doctor = await Doctor.findOne({email: req.body.email});
        if(doctor){
            return res.json(409, {
                message: 'User already Exists!!'
            });
        }else{
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
        let doctor = await Doctor.findOne({email: req.body.email});
        if(!doctor || doctor.password != req.body.password){
            return res.json(422, {
                message: 'Invalid username/password!!'
            });
        }else{
            return res.json(200, {
                message: 'Sign In successfull',
                data: {
                    token: jwt.sign(doctor.toJSON(), 'secret', {expiresIn: '100000'})
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