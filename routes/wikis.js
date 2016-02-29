//Example Wiki - http://language-wikipedia.herokuapp.com/python

var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 

var path = require('path');
var Wiki = require(path.join(__dirname,'../models/wikiModel'));

wiki = {}; 

wiki.home = function(req, res){ 
	//load homepage with list of titles in database
	console.log("I am in home")
	Wiki.find({}, function(err, wikiList){
		if(err){
			res.send(err);
		}
		res.json(wikiList);
		console.log(wikiList); 
	})
	
};

wiki.loadPageGET = function(req, res){
	
	//load page of a specific title
	//should also load sidebar of titles
	console.log("I am in loadPage GET")
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
	console.log('WHAT IS THIS SHiT?')
	//edit and save a page with a specific title
	var newHeader = req.body.header;
	var newContent = req.body.content;
	var id = req.body.id;
	Wiki.update({_id: id}, {new:true}, function(err, updatedObj){
		console.log(updatedObj);
		res.json(updatedObj);			
	})
	
};

wiki.saveNewWikiPOST  = function(req, res){
	
	//save a new page to the database
	//should redirect to new post page
	console.log('I AM IN HERE');
	console.log(req); 
	var w = new Wiki({header: req.body.header, content: req.body.content}); 
	w.save(function(err){ 
		if(err){ 
			console.log("there has been an error saving new wiki", err); 
		}
		console.log("Saved new page sucessfully.")
		//DO WE WANT TO REDIRECT? 
		// res.redirect(200, '/api/' + w.header); 
	});

	Wiki.find({}, function(err, allWikis){
		//DO WE WANT TO SEND JSON BACK? 
		res.json(allWikis); 
	})
}

wiki.catchAnything = function(req, res){ 

	console.log("Caught something")
}


module.exports = wiki;