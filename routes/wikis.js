var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 
var path = require('path'); 
var Wiki = require(path.join(__dirname,'../models/wikiModel'));


wiki = {}; 

wiki.home = function(req, res){ 
	//Input: req, res objects 
	//Output: sends error if error and sends json of wiki list to front end 
	
	//find all wikis and load homepage with list of titles in database
	Wiki.find({}, function(err, wikiList){
		if(err){
			res.send(err);
		}
		res.json(wikiList);
	})
};

wiki.loadPageGET = function(req, res){
	//Input: req, res objects 
	//Output: sends error if error finding wiki object. Else sends json object of selected wiki
	//selected wiki is determined by a parameter in the route

	var header = req.params.title;
	
	//find wiki object
	Wiki.findOne({header:header}, function(err, wikiContent){
		if(err){
			res.send(err);
		}

		//json object to load page of a specific title
		res.json(wikiContent);
	})
};

wiki.updateWikiPOST = function(req, res){
	//Input: req, res objects
	//Output: sends json objects of all wiki objects to display in side bar and updated wiki object to show updated wiki page

	//original header from the original route called
	var oldHeader = req.params.title;

	//new header and content retrieved from form
	var newHeader = req.body.header;
	var newContent = req.body.content;

	//update database entry with new content
	Wiki.update({header:oldHeader}, {$set: {header:newHeader, content: newContent}}, function(err, record){
			Wiki.findOne({header:newHeader}, function(err, updatedObj){
				Wiki.find({}, function(err, listAll){

					//send new content and list of all objects back to front-end
					res.json({mainWiki:updatedObj, all:listAll})
				})
			})
	})
};

wiki.saveNewWikiPOST  = function(req, res){
	//Input: req, res objects
	//Output: sends json objects of all wiki objects to display in side bar and new wiki object

	var w = new Wiki({header: req.body.header, content: req.body.content}); 

	//update database with new wiki
	w.save(function(err){ 
		if(err){ 
			res.send("There has been an error saving the wiki")
		}

		//send all wikis along with new wiki back to front end
		Wiki.find({}, function(err, allWikis){
			res.json({all:allWikis, newWiki: w}); 
		})
	});


}

wiki.catchAnything = function(req, res){ 
	//Input: req, res objects
	//Output: error message
	res.send("There was an error.")
}


module.exports = wiki;