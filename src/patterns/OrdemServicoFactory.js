const OrdemServico = require('../models/OrdemServico');

class OrdemServicoFactory {
  static criarOrdemServico({ id = null, clienteId, equipamentoId, descricaoDefeito, valorServico = 0, status = null }) {
    const ordem = new OrdemServico(id, clienteId, equipamentoId, descricaoDefeito, valorServico);

    if (status) {
      ordem.alterarStatus(status);
    }

    return ordem;
  }
}

module.exports = OrdemServicoFactory;