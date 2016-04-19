var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var  ObjectId = Schema.ObjectId; //Schema.ObjectId

var SubCategory = new Schema({
	ObjectId: ObjectId,
	subcategory_name: { type: String},
	p_category_name: { type: String}

});



module.exports = mongoose.model('SubCategory', SubCategory);