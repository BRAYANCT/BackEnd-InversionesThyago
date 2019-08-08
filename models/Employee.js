var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var EmployeeSchema = new Schema({

    Role: { type: String, required: true, default: 'UserRole' }

});
module.exports = mongoose.model('Employee', EmployeeSchema);