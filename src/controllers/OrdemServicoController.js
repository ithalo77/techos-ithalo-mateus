const OrdemServicoFactory = require('../patterns/OrdemServicoFactory');

class OrdemServicoController {
  constructor() {
    this.ordens = [];
    this.proximoId = 1;
  }

  listarTodas(req, res) {
    return res.status(200).json({
      sucesso: true,
      dados: this.ordens,
      mensagem: 'Ordens de serviço listadas com sucesso.'
    });
  }

  criar(req, res) {
    try {
      const { clienteId, equipamentoId, descricaoDefeito, valorServico } = req.body;
      const novaOrdem = OrdemServicoFactory.criarOrdemServico({
        id: this.proximoId++,
        clienteId,
        equipamentoId,
        descricaoDefeito,
        valorServico
      });

      this.ordens.push(novaOrdem);

      return res.status(201).json({
        sucesso: true,
        dados: novaOrdem,
        mensagem: 'Ordem de serviço criada com sucesso.'
      });
    } catch (error) {
      return res.status(400).json({
        sucesso: false,
        dados: null,
        mensagem: error.message
      });
    }
  }
}

module.exports = OrdemServicoController;