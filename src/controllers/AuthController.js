const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tecnico = require('../models/Tecnico');
const Atendente = require('../models/Atendente');

class AuthController {
  constructor() {
    const senhaPadraoHash = bcrypt.hashSync('TechOS@123', 10);

    this.usuarios = [
      new Tecnico('Técnico TechOS', 'tecnico@techos.com', senhaPadraoHash, 'Manutenção Geral'),
      new Atendente('Atendente TechOS', 'atendente@techos.com', senhaPadraoHash, 'Recepção')
    ];
  }

  login(req, res) {
    const { email, senha } = req.body || {};

    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        dados: null,
        mensagem: 'E-mail e senha são obrigatórios.'
      });
    }

    const emailNormalizado = String(email).trim().toLowerCase();
    const usuario = this.usuarios.find((item) => item.email === emailNormalizado);

    if (!usuario || !bcrypt.compareSync(String(senha), usuario.getSenhaHash())) {
      return res.status(401).json({
        sucesso: false,
        dados: null,
        mensagem: 'Credenciais inválidas.'
      });
    }

    const segredo = process.env.JWT_SECRET || 'chave_desenvolvimento_techos';
    const token = jwt.sign(
      {
        email: usuario.email,
        nome: usuario.nome,
        perfil: usuario.perfil,
        permissoes: usuario.obterPermissoes()
      },
      segredo,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      sucesso: true,
      dados: {
        token,
        usuario: {
          nome: usuario.nome,
          email: usuario.email,
          perfil: usuario.perfil
        }
      },
      mensagem: 'Autenticação realizada com sucesso.'
    });
  }
}

module.exports = AuthController;