const express = require('express');


const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);
router.get('/:id/membresias', usuariosController.getUsuarioMembresias);
router.get('/documento/:numero_documento', usuariosController.getUsuarioByDocumento);
router.get('/:id/rol', usuariosController.getUsuarioRol);

module.exports = router;