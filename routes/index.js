var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('hello world');
});

/* GET users listing. */
router.get('/getAll', function(req, res, next) {
  res.json('recuperation des donnee'); 
});

/* GET users listing. */
router.get('/getAll/:id', function(req, res, next) {
  res.json('recuperation des donnee'); 
});

/* POST users listing. */
router.post('/addFormation', function(req, res, next) {
  res.json('add');
});

/* PUT users listing. */
router.put('/updateFormation/:id', function(req, res, next) {
  res.json('update');
});

/* DELETE users listing. */
router.delete('/deleteFormation', function(req, res, next) {
  res.json('delete');
});

module.exports = router;
