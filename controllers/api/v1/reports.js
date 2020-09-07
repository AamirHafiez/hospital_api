const Report = require('../../../models/report');

// filter reports according to status
module.exports.filterAllReports = async function(req, res){
    try {
        let filteredReports = await Report.find({status: req.params.status})
        .populate([
            {
                path: 'doctor'
            },
            {
                path: 'patient'
            }
        ]);
        return res.json(200, {
            message: 'Filtered Reports - ' + req.params.status,
            data: filteredReports
        });

    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}