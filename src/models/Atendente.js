const Usuario = require('./Usuario');

class Atendente extends Usuario {
  constructor(nome, email, senhaHash, setor = 'Recepção Técnica') {
    super(nome, email, senhaHash, 'ATENDENTE');
    this.setor = setor.trim();
  }

  obterPermissoes() {
    return ['CADASTRAR_CLIENTE', 'CADASTRAR_EQUIPAMENTO', 'ABRIR_OS', 'VISUALIZAR_OS'];
  }
}

module.exports = Atendente;