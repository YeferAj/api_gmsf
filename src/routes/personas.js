const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personasController');

router.get('/', personasController.getAllPersonas);
router.get('/:id', personasController.getPersonaById);
router.post('/', personasController.createPersona);
router.put('/:id', personasController.updatePersona);
router.delete('/:id', personasController.deletePersona);

module.exports = router;