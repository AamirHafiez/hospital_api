const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
const jwt = require('jsonwebtoken');

// Patient registration
module.exports.register = async function(req, res){
    try {
        // find patient accoding to phone number
        let patient = await Patient.findOne({phone: req.body.phone}).populate('reports');
        if(patient){ // if found then do not register and just send back patient data
            return res.json(409, {
                message: 'Patient Already exists',
                data: patient
            });
        }else{ // else create patient in database
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
        // first check if patient exists
        let patient = await Patient.findById(req.params.id);
        if(!patient){ // if patient does not exist return error msg
            return res.json(404, {
                message: 'Patient not found!!'
            });
        }else{ // if patient exists create a report
            // get loginned doctor object from headers authorization (Bearer token)
            // split using space, as barear token has two parts: (Bearer token)
            // we only need second part i.e, token and then decode it using jwt
            let doctor = jwt.decode(req.headers.authorization.split(' ')[1]);
            // create report in db
            let report = await Report.create({
                doctor: doctor._id,
                patient: req.params.id,
                status: req.body.status
            });
            // push reports in db of patient
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

// show all reports of a patient
module.exports.showAllReports = async function(req, res){
    try {
        // find the patient using the params from url and populate necessary
        let patient = await Patient.findById(req.params.id).populate({
            path: 'reports',
            populate: [{
                path: 'doctor'
            },{
                path: 'patient'
            }]
        })
        .sort({'createdAt' : 'asc'}); // sort according to createdAt in ascending order
        if(!patient){ // if patient is not found send error msg
            return res.json(404, {
                message: 'Patient not found'
            });
        }else{ // else send all reports of the patient
            return res.json(200, {
                message: 'All reports of Patient',
                data: patient.reports
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}