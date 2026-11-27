const express = require('express');
const CadastrosController = require('../controllers/CadastrosController');
const autenticarToken = require('../middlewares/authMiddleware');

const router = express.Router();
const controller = new CadastrosController();

router.get('/clientes', (req, res) => controller.listarClientes(req, res));
router.post('/clientes', autenticarToken, (req, res) => controller.criarCliente(req, res));

router.get('/equipamentos', (req, res) => controller.listarEquipamentos(req, res));
router.post('/equipamentos', autenticarToken, (req, res) => controller.criarEquipamento(req, res));

module.exports = router;