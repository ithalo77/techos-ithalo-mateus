class Usuario {
  #senhaHash;

  constructor(nome, email, senhaHash, perfil = 'USUARIO') {
    if (!nome || !nome.trim()) {
      throw new Error('Nome do usuário é obrigatório.');
    }
    if (!email || !email.includes('@')) {
      throw new Error('E-mail inválido.');
    }
    if (!senhaHash) {
      throw new Error('Hash de senha é obrigatório.');
    }

    this.nome = nome.trim();
    this.email = email.trim().toLowerCase();
    this.#senhaHash = senhaHash;
    this.perfil = perfil;
  }

  getSenhaHash() {
    return this.#senhaHash;
  }

  obterPermissoes() {
    return ['VISUALIZAR_OS'];
  }
}

module.exports = Usuario;