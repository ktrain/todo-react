// items model

// connect
var dbName = 'grocery';
var username = 'root';
var password = 'root';
var Sequelize = require('sequelize')
    , sequelize = new Sequelize(dbName, username, password);

// the schema
var Item = sequelize.define('Item', {
    id:     {
        type: Sequelize.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    value:  Sequelize.STRING(255),
    qty:    Sequelize.INTEGER,
});

// create the table, if necessary
Item.sync();


// instance methods

exports.findAll = function(req,res) {
    console.log('Finding all items');
    return Item.findAll().success(function(items) {
        res.send(items);
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Finding item: ' + id);
    return Item.find(id).success(function(item) {
        res.send(item);
    });
};

exports.create = function(req, res) {
    console.log('Creating new item: ' + JSON.stringify(req.body));
    var item = Item.create(req.body).success(function(item) {
        res.send(item);
        console.log('Created new item: ' + JSON.stringify(item));
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    console.log('Updating item: ' + JSON.stringify(req.body));
    return Item.find(id).success(function(item) {
        item.updateAttributes(req.body).success(function() {
            res.send(item);
        });
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting item: ' + id);
    return Item.find(id).success(function(item) {
        item.destroy().success(function() {
            res.send({});
        });
    });
};
