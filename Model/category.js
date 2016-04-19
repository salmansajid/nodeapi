var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var  ObjectId = Schema.ObjectId; //Schema.ObjectId

var Category = new Schema({
	ObjectId: ObjectId,
	category_name: { type: String}

});



module.exports = mongoose.model('Category', Category);