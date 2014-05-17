// items

var mongo = require('mongodb');

var Server  = mongo.Server,
    Db      = mongo.Db,
    BSON    = mongo.BSONPure;

var db      = new Db('todo', new Server('localhost', 27017, {auto_reconnect: true}));

var collectionName = 'items';
var errorResponse = { "error": "An error has occurred." };

db.open(function(err, db) {
    if (err) {
        // TODO: ?
        return;
    }
    db.collection(collectionName, {strict:true}, function(err, collection) {
        if (err) {
            console.log("The '" + collectionName + "' collection doesn't exist. Creating...");
            db.collection(collectionName, function(err, collection) {
                collection.insert([], {safe:true}, function(err, result) {});
            });
        }
    });
});

// retrieve all items
exports.findAll = function(req, res) {
    db.collection(collectionName, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

// retrieve item by id
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection(collectionName, function(err, collection) {
        console.log(collection);
        collection.findOne({'_id':new BSON.ObjectId(id)}, function(err, item) {
            res.send(item);
        });
    });
};

// add a new item
exports.add = function(req, res) {
    console.log(req.body);
    var item = req.body;
    console.log('Adding item: ' + JSON.stringify(item));
    db.collection(collectionName, function(err, collection) {
        collection.insert(item, {safe:true}, function(err, result) {
            if (err) {
                res.send(errorResponse);
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

// update item
exports.update = function(req, res) {
    var id = req.params.id;
    var item = req.body;
    console.log('Updating item: ' + id);
    console.log(JSON.stringify(item));
    db.collection(collectionName, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, item, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating item: ' + err);
                res.send(errorResponse);
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(item);
            }
        });
    });
};

// delete items
exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting item: ' + id);
    db.collection(collectionName, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating item: ' + err);
                res.send(errorResponse);
            } else {
                console.log('' + result + 'document(s) updated');
                res.send(req.body);
            }
        });
    });
};

