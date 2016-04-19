var mongoose    =   require("mongoose");
var Schema = mongoose.Schema; //Schema.ObjectId


var Images = new Schema({
    kind: { 
        type: String,
        required: true
    },
    url: { type: String, required: true }
});

// Product Model

var Item = new Schema({
    title: { type: String},
    comment: { type: String},
    price: { type: Number},
    contactno: { type: String},
    images: [Images],
    category: { type: String},
    subcategory: { type: String},
    status : {type :Boolean}
});

// validation

// Product.path('title').validate(function (v) {
//     console.log("validate title");
//     console.log(v);
//     return v.length > 10 && v.length < 70;
// });

// // Product.path('style').validate(function (v) {
// //     console.log("validate style");
// //     console.log(v);
// //     return v.length < 40;
// // }, 'Product style attribute is should be less than 40 characters');

// Product.path('description').validate(function (v) {
//     console.log("validate description");
//     console.log(v);
//     return v.length > 10;
// }, 'Product description should be more than 10 characters');





// REST api


module.exports = mongoose.model('Item', Item);