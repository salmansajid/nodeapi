var mongoose    =   require("mongoose");
var Schema = mongoose.Schema; //Schema.ObjectId


var Images = new Schema({
    kind: { 
        type: String,
        required: true
    },
    url: { type: String, required: true }
});

// Volunteer Model

var Volunteer = new Schema({
    title: { type: String},
    comment: { type: String},
    price: { type: Number},
    contactno: { type: String},
    location: { type: String},
    images: [Images],
    logo: [Images],
    status : {type :Boolean}
});



module.exports = mongoose.model('Volunteer', Volunteer);