// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let propertyList = new Schema({
//     id: { type: String },
//     host_id: { type: String },
//     admin_id: { type: String },
//     property_name: { type: String },
//     property_type_id: { type: String },
//     property_address: { type: String },
//     property_destination: { type: String },
//     entire_home_details: { type: Object },
//     private_room_details: { type: Object },
//     guest_capacity: { type: Object },
//     guest_extra_capacity: { type: String },
//     with_or_without_food: { type: String },
//     weekdays_price: { type: String },
//     weekends_price: { type: String },
//     weekdays_price_extra_guest: { type: String },
//     weekends_price_extra_guest: { type: String },
//     photo_list: { type: Array },
//     category1_ammenities: { type: Array },
//     category2_ammenities: { type: Array },
//     youtube_link: { type: String },
//     property_description: { type: String },
//     check_in_time: { type: String },
//     check_out_time: { type: String },
//     near_by_places: { type: Array },
//     house_rules: { type: Array },
//     important_notes: { type: String },
//     host_name: { type: String },
//     host_language: { type: Array },
//     status: { type: String }
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('property_list', propertyList)