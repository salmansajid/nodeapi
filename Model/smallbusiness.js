var mongoose    =   require("mongoose");
var Schema = mongoose.Schema; //Schema.ObjectId


var Images = new Schema({
    kind: { 
        type: String,
        required: true
    },
    url: { type: String, required: true }
});

// Smallbusiness Model

var Smallbusiness = new Schema({
    title: { type: String},
    comment: { type: String},
    price: { type: Number},
    contactno: { type: String},
    location: { type: String},
    images: [Images],
    logo: [Images],
    status : {type :Boolean}
});



module.exports = mongoose.model('Smallbusiness', Smallbusiness);