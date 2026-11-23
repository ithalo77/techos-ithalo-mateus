const express = require('express');
const OrdemServicoController = require('../controllers/OrdemServicoController');
const autenticarToken = require('../middlewares/authMiddleware');
const { validarCriacaoOs, validarAtualizacaoStatusOs } = require('../middlewares/validarOsMiddleware');

const router = express.Router();
const controller = new OrdemServicoController();

router.get('/', (req, res) => controller.listarTodas(req, res));
router.post('/', autenticarToken, validarCriacaoOs, (req, res) => controller.criar(req, res));
router.patch('/:id/status', autenticarToken, validarAtualizacaoStatusOs, (req, res) => controller.atualizarStatus(req, res));

module.exports = router;