const DatabaseSingleton = require('../patterns/DatabaseSingleton');
const OrdemServicoFactory = require('../patterns/OrdemServicoFactory');

class OrdemServicoController {
  constructor() {
    this.pool = new DatabaseSingleton().getPool();
  }

  formatarLinha(row) {
    return {
      id: row.id,
      clienteId: row.cliente_id,
      equipamentoId: row.equipamento_id,
      usuarioId: row.usuario_id,
      descricaoDefeito: row.descricao_defeito,
      valorServico: Number(row.valor_servico),
      status: row.status,
      dataAbertura: row.data_abertura,
      dataAtualizacao: row.data_atualizacao
    };
  }

  async listarTodas(req, res) {
    try {
      const { status } = req.query;
      let sql = `
        SELECT id, cliente_id, equipamento_id, usuario_id, descricao_defeito, valor_servico, status, data_abertura, data_atualizacao
        FROM ordens_servico
      `;
      const params = [];

      if (status) {
        sql += ' WHERE status = ?';
        params.push(status);
      }

      sql += ' ORDER BY id DESC';

      const [rows] = await this.pool.execute(sql, params);
      const dados = rows.map((row) => this.formatarLinha(row));

      return res.status(200).json({
        sucesso: true,
        dados,
        mensagem: 'Ordens de serviço listadas com sucesso.'
      });
    } catch (error) {
      return res.status(500).json({
        sucesso: false,
        dados: null,
        mensagem: 'Erro ao consultar ordens de serviço no banco de dados.'
      });
    }
  }

  async criar(req, res) {
    const connection = await this.pool.getConnection();
    try {
      const { clienteId, equipamentoId, descricaoDefeito, valorServico } = req.body;

      // Valida regra de domínio via factory antes de abrir transação
      const ordemValidada = OrdemServicoFactory.criarOrdemServico({
        clienteId,
        equipamentoId,
        descricaoDefeito,
        valorServico
      });

      await connection.beginTransaction();

      const [result] = await connection.execute(
        `INSERT INTO ordens_servico (cliente_id, equipamento_id, descricao_defeito, valor_servico, status)
         VALUES (?, ?, ?, ?, ?)`,
        [
          ordemValidada.clienteId,
          ordemValidada.equipamentoId,
          ordemValidada.descricaoDefeito,
          ordemValidada.valorServico,
          ordemValidada.status
        ]
      );

      await connection.commit();

      const [rows] = await connection.execute(
        `SELECT id, cliente_id, equipamento_id, usuario_id, descricao_defeito, valor_servico, status, data_abertura, data_atualizacao
         FROM ordens_servico WHERE id = ?`,
        [result.insertId]
      );

      return res.status(201).json({
        sucesso: true,
        dados: rows[0] ? this.formatarLinha(rows[0]) : null,
        mensagem: 'Ordem de serviço criada com sucesso.'
      });
    } catch (error) {
      await connection.rollback();
      const statusHttp = error.message && (
        error.message.includes('obrigatóri') ||
        error.message.includes('Status inválido')
      ) ? 400 : 500;

      return res.status(statusHttp).json({
        sucesso: false,
        dados: null,
        mensagem: statusHttp === 400 ? error.message : 'Falha na transação ao criar Ordem de Serviço.'
      });
    } finally {
      connection.release();
    }
  }

  async atualizarStatus(req, res) {
    const connection = await this.pool.getConnection();
    try {
      const id = Number(req.params.id);
      const { status, valorServico } = req.body;

      await connection.beginTransaction();

      const [rowsAtuais] = await connection.execute(
        `SELECT id, cliente_id, equipamento_id, usuario_id, descricao_defeito, valor_servico, status
         FROM ordens_servico WHERE id = ? FOR UPDATE`,
        [id]
      );

      if (!rowsAtuais.length) {
        await connection.rollback();
        return res.status(404).json({
          sucesso: false,
          dados: null,
          mensagem: 'Ordem de serviço não encontrada.'
        });
      }

      const atual = rowsAtuais[0];
      const ordem = OrdemServicoFactory.criarOrdemServico({
        id: atual.id,
        clienteId: atual.cliente_id,
        equipamentoId: atual.equipamento_id,
        descricaoDefeito: atual.descricao_defeito,
        valorServico: valorServico !== undefined ? Number(valorServico) : Number(atual.valor_servico),
        status: status || atual.status
      });

      await connection.execute(
        `UPDATE ordens_servico
         SET status = ?, valor_servico = ?
         WHERE id = ?`,
        [ordem.status, ordem.valorServico, id]
      );

      await connection.commit();

      const [rowsAtualizadas] = await connection.execute(
        `SELECT id, cliente_id, equipamento_id, usuario_id, descricao_defeito, valor_servico, status, data_abertura, data_atualizacao
         FROM ordens_servico WHERE id = ?`,
        [id]
      );

      return res.status(200).json({
        sucesso: true,
        dados: this.formatarLinha(rowsAtualizadas[0]),
        mensagem: 'Ordem de serviço atualizada com sucesso.'
      });
    } catch (error) {
      await connection.rollback();
      const statusHttp = error.message && error.message.includes('Status inválido') ? 400 : 500;
      return res.status(statusHttp).json({
        sucesso: false,
        dados: null,
        mensagem: statusHttp === 400 ? error.message : 'Falha na transação ao atualizar Ordem de Serviço.'
      });
    } finally {
      connection.release();
    }
  }
}

module.exports = OrdemServicoController;