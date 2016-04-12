var mongoose = require('mongoose'); 

var pageSchema = mongoose.Schema({ 
	header: String, 
	content: String
}, {'collection' : 'wiki'}); 
// per the mongoose docs collection names should be capital, you also probably don't need to specify it on the line above and on the line below
var wiki = mongoose.model('wiki',  pageSchema);
module.exports = wiki;
