var express = require('express');
var router = express.Router();
var casaController = require('../controllers/CasaController')

/* GET users listing. */
router.get('/:owner', casaController.getOne);
router.get('/casas/', casaController.getAll);

router.post('/nuevo/:owner,:ubicacion,:habitaciones,:cochera',casaController.insert);
router.put('/actualizar/:owner', casaController.update);
router.delete('/ver/:owner',casaController.delete);

module.exports = router;
