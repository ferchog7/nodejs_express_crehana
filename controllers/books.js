var Books = require('../models/books');

exports.create = function (req, res) {
    var newBooks = new Books(req.body);
    newBooks.save(function (err, books) {
            if(err) {
                res.status(400).send({message: err});
            }
            return res.status(201).send({books}); 
    });
};

exports.update = function (req, res) {
    var bookId = req.params.id || null;
    if(bookId == null) return res.status(404).send({message: 'Book ID no Valid.'});
    Books.findByIdAndUpdate(bookId, req.body, {new:true}, function (err, books) {
            if(err) {
                res.status(400).send({message: err});
            }
            return res.status(201).send({books}); 
    });
};

exports.list = function (req, res) {
    Books.find({}).exec(function (err, books) {
            if (err) {
                    res.status(400).send({message: err});
            }
            return res.status(200).send({
                    books
            });
    });
};

exports.byId = function (req, res) {
    var bookId = req.params.id || null;
    Books.findById(bookId).exec(function (err, books) {
            if (err) {
                    res.status(400).send({message: err});
            }
            return res.status(200).send({books});
    });
};