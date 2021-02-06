const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminDetails = new Schema({
    id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone_number: { type: String },
    username: { type: String },
    password: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('admin_details', adminDetails)