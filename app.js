// // var exphbs = require('express-handlebars');

// var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
// var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// mongoose.connect('mongodb://localhost/test');

var express = require('express');
var wiki = require('./routes/wikis');
var app = express();


    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var wiki = require('./routes/wikis');

    // configuration =================

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

app.get('/', function(req, res){
        res.sendfile('public/views/index.html');
    });
app.get('/api/home', wiki.home);
app.get('/api/:title', wiki.loadPageGET);
app.post('/api/:title', wiki.updateWikiPOST);
app.post('/api/createNew', wiki.saveNewPOST);

    var mongoURI = process.env.PROD_MONGODB || "mongodb://localhost/test";
    console.log(mongoURI)
    mongoose.connect(mongoURI);

    var PORT = process.env.PORT || 5000;
    app.listen(PORT, function() {
      console.log("Application running on port: ", PORT);
    });