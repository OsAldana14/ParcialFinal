var express = require('express');
var router = express.Router();
var casaController = require('../controllers/CasaController')

/* GET users listing. */
router.get('/:owner', casaController.getOne);
router.get('/', casaController.getAll);

router.post('/',casaController.register);
router.put('/:owner', casaController.update);
router.delete('/:owner',casaController.delete);

module.exports = router;
