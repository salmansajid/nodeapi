var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var  ObjectId = Schema.ObjectId;
var  crypto = require('crypto');

// var algorithm = 'aes256'; 
// var key = 'D#$DF#QD#@~!W@E@';
// var pw = '';

var Images = new Schema({
    kind: { 
        type: String, 
        enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
      
    },
    url: { type: String }
});

 var User  = new Schema({
    ObjectId: ObjectId,
    username: { type: String},
    email: { type: String},
    contactno: { type: String },
    password: { type: String },
    confrimpassword: { type: String},
    gender: {type:String},
    userimages: [Images],
    //date: { type: Date},
    verifycode : {type: String},
    status : {type:Boolean}
});


//encrypt method

// User.methods.encrypt = function encrypt(str) {
//   pw = str;
//   var cipher = crypto.createCipher(algorithm, key);  
//   var encrypted = cipher.update(pw, 'utf8', 'hex') + cipher.final('hex');
//   console.log("ENCRYPTED: " + encrypted);
//   return encrypted;
// }

// //password setter
// User.path('password').set(function(v) {
//   return this.encrypt(v);
// });


module.exports = mongoose.model('User',User);