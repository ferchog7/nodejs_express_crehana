var Category = require('../models/categories');

exports.create = function (req, res) {
    var newCategory = new Category(req.body);
    newCategory.save(function (err, category) {
            if(err) {
                res.status(400).send({message: err});
            }
            return res.status(201).send({category}); 
    });
};

exports.update = function (req, res) {
    var categoryId = req.params.id || null;
    if(categoryId == null) return res.status(404).send({message: 'Category ID no Valid.'});
    Category.findByIdAndUpdate(categoryId, req.body, {new:true}, function (err, categories) {
            if(err) {
                res.status(400).send({message: err});
            }
            return res.status(201).send({categories}); 
    });
};

exports.list = function (req, res) {
        Category.find({}).exec(function (err, categories) {
            if (err) {
                    res.status(400).send({message: err});
            }
            return res.status(200).send({
                    categories
            });
    });
};

exports.byId = function (req, res) {
    var categoryId = req.params.id || null;
    Category.findById(categoryId).exec(function (err, categories) {
            if (err) {
                    res.status(400).send({message: err});
            }
            return res.status(200).send({categories});
    });
};