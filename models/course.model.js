const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courses = new Schema({
    id: { type: String },
    name: { type: String },
    duration: { type: String },
    frequency: { type: String },
    tutor: { type: String },
    subject: { type: String },
    start_time: { type: String },
    end_time: { type: String },
    capacity: { type: String },
    course_id:{ type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('Courses', courses)