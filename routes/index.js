var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'The Online Piano',
    subtitle: 'cuz lets face it, nobody owns a piano.' 
  });
  // console.log('ehllo');

});


module.exports = router;
