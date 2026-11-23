const STATUS_PERMITIDOS = ['ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA'];

function validarCriacaoOs(req, res, next) {
  const { clienteId, equipamentoId, descricaoDefeito, valorServico } = req.body || {};

  if (!clienteId || !equipamentoId) {
    return res.status(400).json({
      sucesso: false,
      dados: null,
      mensagem: 'Os campos clienteId e equipamentoId são obrigatórios.'
    });
  }

  if (!descricaoDefeito || typeof descricaoDefeito !== 'string' || descricaoDefeito.trim().length < 3) {
    return res.status(400).json({
      sucesso: false,
      dados: null,
      mensagem: 'A descrição do defeito deve ter pelo menos 3 caracteres.'
    });
  }

  if (valorServico !== undefined && (Number.isNaN(Number(valorServico)) || Number(valorServico) < 0)) {
    return res.status(400).json({
      sucesso: false,
      dados: null,
      mensagem: 'O valor do serviço deve ser um número igual ou maior que zero.'
    });
  }

  return next();
}

function validarAtualizacaoStatusOs(req, res, next) {
  const { status, valorServico } = req.body || {};

  if (status && !STATUS_PERMITIDOS.includes(status)) {
    return res.status(400).json({
      sucesso: false,
      dados: null,
      mensagem: 'Status inválido. Valores aceites: ABERTA, EM_ANDAMENTO ou CONCLUIDA.'
    });
  }

  if (valorServico !== undefined && (Number.isNaN(Number(valorServico)) || Number(valorServico) < 0)) {
    return res.status(400).json({
      sucesso: false,
      dados: null,
      mensagem: 'O valor do serviço deve ser um número igual ou maior que zero.'
    });
  }

  return next();
}

module.exports = {
  validarCriacaoOs,
  validarAtualizacaoStatusOs
};