// var exphbs = require('express-handlebars');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

mongoose.connect('mongodb://localhost/test');

var express = require('express');
var wiki = require('./routes/wikis');
var app = express();

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/', wiki.home);
app.get('/api/:title', wiki.loadPageGET);
app.post('/api/:title', wiki.savePOST);
app.get('/api/createNew', wiki.createNewGET);
app.post('/api/createNew', wiki.saveNewPOST);

    var PORT = process.env.PORT || 2000;
    app.listen(PORT, function() {
      console.log("Application running on port: ", PORT);
    });