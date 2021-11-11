const express = require('express');
const router = express.Router();
const book = require('../controllers/books');

router.get('/', function(req, res){
    book.list(req,res);
});

router.get('/:id', function(req, res) {
    book.byId(req,res);
});

router.post('/', function(req, res) {
    book.create(req,res);
});

router.put('/:id', function(req, res) {
    book.update(req,res);
});

module.exports = router;