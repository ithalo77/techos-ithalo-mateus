const OrdemServicoFactory = require('../patterns/OrdemServicoFactory');

class OrdemServicoController {
  constructor() {
    this.ordens = [];
    this.proximoId = 1;
  }

  listarTodas(req, res) {
    const { status } = req.query;
    const filtradas = status
      ? this.ordens.filter((os) => os.status === status)
      : this.ordens;

    return res.status(200).json({
      sucesso: true,
      dados: filtradas,
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

  atualizarStatus(req, res) {
    try {
      const id = Number(req.params.id);
      const { status, valorServico } = req.body;
      const ordem = this.ordens.find((item) => item.id === id);

      if (!ordem) {
        return res.status(404).json({
          sucesso: false,
          dados: null,
          mensagem: 'Ordem de serviço não encontrada.'
        });
      }

      if (status) {
        ordem.alterarStatus(status);
      }
      if (valorServico !== undefined) {
        ordem.valorServico = Number(valorServico);
      }

      return res.status(200).json({
        sucesso: true,
        dados: ordem,
        mensagem: 'Ordem de serviço atualizada com sucesso.'
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