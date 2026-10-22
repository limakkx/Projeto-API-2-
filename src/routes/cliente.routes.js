'use strict';

const express = require('express');
const controller = require('../controllers/cliente.controller');

const router = express.Router();

router.get('/', controller.listar);
router.post('/', controller.cadastrar);
router.get('/:id', controller.consultar);
router.put('/:id', controller.alterar);
router.patch('/:id', controller.alterar);
router.delete('/:id', controller.excluir);

module.exports = router;
