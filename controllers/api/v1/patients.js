const Patient = require('../../../models/patient');

// Patient registration
module.exports.register = async function(req, res){
    try {
        let patient = await Patient.findOne({phone: req.body.phone});
        if(patient){
            return res.json(409, {
                message: 'Patient Already exists',
                data: patient
            });
        }else{
            await Patient.create(req.body);
            return res.json(200, {
                message: 'Patient Registered'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}