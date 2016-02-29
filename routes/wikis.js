//Example Wiki - http://language-wikipedia.herokuapp.com/python

var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 

var wikiModel = require('../models/wikiModel');

var Wiki = mongoose.model('wiki', wikiModel.pageSchema);

wiki = {}; 


wiki.home = function(req, res){ 
	//load homepage with list of titles in database
	
	Wiki.find({}, function(err, wikiList){
		if(err){
			res.send(err);
		}
		res.json(wikiList);
	})
	
}

wiki.loadPageGET = function(req, res){
	
	//load page of a specific title
	//should also load sidebar of titles
	
	var header = req.params.title;
	Wiki.findOne({header:header}, function(err, wikiContent){
		if(err){
			res.send(err);
		}
		console.log(wikiContent);
		res.json(wikiContent);
	})

};

wiki.updateWikiPOST = function(req, res){
	
	//edit and save a page with a specific title
	var newHeader = req.body.header;
	var newContent = req.body.content;
	var id = req.body.id;
	Wiki.update({_id: id}, {new:true}, function(err, updatedObj){
		console.log(updatedObj);
		res.json(updatedObj);			
	})
	
};


wiki.saveNewPOST = function(req, res){
	
	//save a new page to the database
	//should redirect to new post page

	var w = new Wiki({header: req.body.header, content: req.body.content}); 
	w.save(function(err){ 
		if(err){ 
			console.log("there has been an error saving new wiki", err); 
		}
		res.redirect(200, '/api/' + w.header); 
	})
};


module.exports = wiki;