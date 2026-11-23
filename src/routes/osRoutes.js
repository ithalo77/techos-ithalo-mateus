const express = require('express');
const OrdemServicoController = require('../controllers/OrdemServicoController');

const router = express.Router();
const controller = new OrdemServicoController();

router.get('/', (req, res) => controller.listarTodas(req, res));
router.post('/', (req, res) => controller.criar(req, res));
router.patch('/:id/status', (req, res) => controller.atualizarStatus(req, res));

module.exports = router;