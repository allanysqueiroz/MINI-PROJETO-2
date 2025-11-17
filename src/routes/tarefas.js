const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefaController');
const validate = require('../middlewares/validateTarefa');

router.post('/', validate, controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.put('/:id', validate, controller.atualizar);
router.patch('/:id/status', validate, controller.atualizarStatus);
router.delete('/:id', controller.deletar);

module.exports = router;
