const Usuario = require('./Usuario');

class Tecnico extends Usuario {
  constructor(nome, email, senhaHash, especialidade) {
    super(nome, email, senhaHash, 'TECNICO');
    if (!especialidade || !especialidade.trim()) {
      throw new Error('Especialidade do técnico é obrigatória.');
    }
    this.especialidade = especialidade.trim();
  }

  obterPermissoes() {
    return ['VISUALIZAR_OS', 'ATUALIZAR_STATUS_OS', 'FINALIZAR_OS'];
  }
}

module.exports = Tecnico;