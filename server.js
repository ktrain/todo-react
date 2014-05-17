// globals
var http    = require('http');
var express = require('express');

    items   = require('./routes/items');
var app     = module.exports = express();

app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

var port = process.env.PORT || 8000;

app.get(    '/api/items',       items.findAll);
app.get(    '/api/items/:id',   items.findById);
app.post(   '/api/items',       items.add);
app.put(    '/api/items/:id',   items.update);
app.delete( '/api/items/:id',   items.delete);

app.listen(port);
console.log('Listening on ' + port);

