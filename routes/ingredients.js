var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 

var wikiModel = require('../models/wikiModel');

var Wiki = mongoose.model('wiki', wikiModel.pageSchema);

wiki = {}; 


// var getIngredients = function(callback){ 
// 	//Input: callback function to call next after this function executes 
// 	//Output: returns a call to the callback function with all of the ingredients found in mongoose 
// 	ingredients.find({}, function(err, allIngredients){
// 		if (err){ 
// 			console.log(err); 
// 		}
// 		return callback(allIngredients); 
// 	}); 
// }

// var addIngredient = function(request, response){
// 	//Input: request, response object
// 	//Output: --

// 	//makes a new ingredient with the ingredient schema and saves it to the database 
// 	var newIngredient = new ingredients({name: request.body.name, price: request.body.price, outOfStock: request.body.outOfStock}); 
// 	newIngredient.save(function(err){ 
// 		console.log("there was a problem saving the new ingredient", err); 
// 	})
// }

wiki.home = function(request, response){ 
	//annabel
	//load homepage with list of titles in database
	//res.send
}

wiki.loadPageGET = function(req, res){
	//zarin
	//load page of a specific title
	//res.send

};

wiki.savePOST = function(req, res){
	//zarin
	//edit and save a page with a specific title
	
};


wiki.createNewGET = function(req, res){
	//casey
	//load a page with a form on it
	//res.send

};

wiki.saveNewPOST = function(req, res){
	//casey
	//save a new page to the database

};


module.exports = wiki;