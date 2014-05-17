// items

var mongo = require('mongoose');

// model definition
var ItemSchema = mongoose.Schema({
    value:      String,
    index:      Number,
    checked:    Boolean
});

var errorResponse = {'error':'An error has occurred.'};

Item = mongoose.model('Item', ItemSchema);

// module functions
exports.findAll = function(req, res) {
    console.log('Fetching all items');
    return Item.find(function (err, items) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(items);
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Fetching item: ' + id);
    return Item.findById(id, function(err, item) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(item);
    });
};

exports.add = function(req, res) {
    console.log('Adding new item: ' + JSON.stringify(req.body));
    var item = new Item(req.body);
    return item.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(item);
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    console.log('Updating item: ' + JSON.stringify(id));
    return Item.findOneAndUpdate({'_id':id}, req.body, {}, function(err, item) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(item);
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;
    return Item.remove({'_id':id}, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send({});
    });
};

