const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminAuthentication = new Schema({
    id: { type: String },
    admin_id: { type: String },
    token: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('admin_authentications', adminAuthentication)