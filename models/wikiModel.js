var mongoose = require('mongoose'); 

var pageSchema = mongoose.Schema({ 
	header: String, 
	content: String
}); 

module.exports = mongoose.model('wiki',  pageSchema); 