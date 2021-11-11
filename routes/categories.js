const express = require('express');
const router = express.Router();
const category = require('../controllers/categories');

router.get('/', function(req, res){
    category.list(req,res);
});

router.get('/:id', function(req, res) {
    category.byId(req,res);
});

router.post('/', function(req, res) {
    category.create(req,res);
});

router.put('/:id', function(req, res) {
    category.update(req,res);
});

module.exports = router;