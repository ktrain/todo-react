http = require('http');
express = require('express');

app = module.exports = express();
app.configure(function() {
    app.set('title', 'To-Do');
    app.engine('html', require('ejs').renderFile);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

// models
items   = require('./routes/items');

// routes
app.get('/', function(req, res) {
    res.render('home.html');
});

// api
app.get(    '/api/items',       items.findAll);
app.get(    '/api/items/:id',   items.findById);
app.post(   '/api/items',       items.create);
app.put(    '/api/items/:id',   items.update);
app.delete( '/api/items/:id',   items.delete);

// run it
var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});

