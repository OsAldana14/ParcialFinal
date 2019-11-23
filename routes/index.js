var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req,res) => {
  res.render('index');
});

router.get('/nuevo',(req,res) => {
  res.render('new');
});

router.get('/ver',(req,res) => {
  res.render('todas');
});

router.get('/actualizar',(req,res) => {
  res.render('update');
});
module.exports = router;
