const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
const jwt = require('jsonwebtoken');

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

// create report
module.exports.createReport = async function(req, res){
    try {
        let patient = await Patient.findById(req.params.id);
        if(!patient){
            return res.json(404, {
                message: 'Patient not found!!'
            });
        }else{
            //patient is found and now create a report
            let doctor = jwt.decode(req.headers.authorization.split(' ')[1]);
            let report = await Report.create({
                doctor: doctor._id,
                patient: req.params.id,
                status: req.body.status
            });
            patient.reports.push(report);
            patient.save();
            return res.json(200, {
                message: 'Report Created'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}