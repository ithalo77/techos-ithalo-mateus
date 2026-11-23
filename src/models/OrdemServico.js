const STATUS_VALIDOS = ['ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA'];

class OrdemServico {
  #status;

  constructor(id, clienteId, equipamentoId, descricaoDefeito, valorServico = 0) {
    if (!clienteId || !equipamentoId) {
      throw new Error('Cliente e equipamento são obrigatórios na Ordem de Serviço.');
    }
    if (!descricaoDefeito || !descricaoDefeito.trim()) {
      throw new Error('Descrição do defeito é obrigatória.');
    }

    this.id = id;
    this.clienteId = clienteId;
    this.equipamentoId = equipamentoId;
    this.descricaoDefeito = descricaoDefeito.trim();
    this.valorServico = Number(valorServico) || 0;
    this.#status = 'ABERTA';
    this.dataAbertura = new Date();
  }

  get status() {
    return this.#status;
  }

  alterarStatus(novoStatus) {
    if (!STATUS_VALIDOS.includes(novoStatus)) {
      throw new Error(`Status inválido: ${novoStatus}. Use ABERTA, EM_ANDAMENTO ou CONCLUIDA.`);
    }
    this.#status = novoStatus;
  }
}

module.exports = OrdemServico;