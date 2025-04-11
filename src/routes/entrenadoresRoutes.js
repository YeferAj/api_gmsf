const express = require('express');
const router = express.Router();
const entrenadoresController = require('../controllers/entrenadoresController');

// Define routes with proper controller functions
router.get('/', entrenadoresController.getAllEntrenadores);
router.get('/:id', entrenadoresController.getEntrenadorById);
router.post('/', entrenadoresController.createEntrenador);
router.put('/:id', entrenadoresController.updateEntrenador);
router.delete('/:id', entrenadoresController.deleteEntrenador);

module.exports = router;