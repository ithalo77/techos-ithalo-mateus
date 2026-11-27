const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const Tecnico = require('../src/models/Tecnico');
const Atendente = require('../src/models/Atendente');
const Equipamento = require('../src/models/Equipamento');
const OrdemServicoFactory = require('../src/patterns/OrdemServicoFactory');

describe('Domínio e Regras de Negócio — TechOS', () => {
  it('deve validar hash bcrypt e permissões de Técnico e Atendente', () => {
    const hash = bcrypt.hashSync('SenhaSegura@123', 10);
    const tecnico = new Tecnico('Carlos Silva', 'carlos@techos.com', hash, 'Redes');
    const atendente = new Atendente('Ana Costa', 'ana@techos.com', hash, 'Balcão');

    assert.equal(bcrypt.compareSync('SenhaSegura@123', tecnico.getSenhaHash()), true);
    assert.ok(tecnico.obterPermissoes().includes('FINALIZAR_OS'));
    assert.ok(atendente.obterPermissoes().includes('ABRIR_OS'));
  });

  it('deve criar OrdemServico com status ABERTA e validar mudança de status', () => {
    const os = OrdemServicoFactory.criarOrdemServico({
      id: 10,
      clienteId: 1,
      equipamentoId: 2,
      descricaoDefeito: 'Fonte queimada',
      valorServico: 180
    });

    assert.equal(os.status, 'ABERTA');
    os.alterarStatus('EM_ANDAMENTO');
    assert.equal(os.status, 'EM_ANDAMENTO');

    assert.throws(() => {
      os.alterarStatus('STATUS_INEXISTENTE');
    }, /Status inválido/);
  });

  it('deve rejeitar equipamento sem número de série', () => {
    assert.throws(() => {
      new Equipamento(1, 1, 'Notebook Lenovo', '');
    }, /Número de série é obrigatório/);
  });
});