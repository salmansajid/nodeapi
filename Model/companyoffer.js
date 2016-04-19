var mongoose    =   require("mongoose");
var Schema = mongoose.Schema; //Schema.ObjectId

 



var Images = new Schema({
    kind: { 
        type: String,
        required: true
    },
    url: { type: String, required: true }
});


// CompanyOffer Model

var CompanyOffer = new Schema({
    title: { type: String},
    description: { type: String},
    name: { type: String},
    contactno: { type:  Number},
    categoryoffer: { type: String},
    images: [Images],    
    status : {type :Boolean}
});



module.exports = mongoose.model('CompanyOffer', CompanyOffer);