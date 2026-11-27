const DatabaseSingleton = require('../patterns/DatabaseSingleton');
const Equipamento = require('../models/Equipamento');

class CadastrosController {
  constructor() {
    this.pool = new DatabaseSingleton().getPool();
  }

  async listarClientes(req, res) {
    try {
      const [rows] = await this.pool.execute(
        'SELECT id, nome, telefone, criado_em FROM clientes ORDER BY id DESC'
      );

      return res.status(200).json({
        sucesso: true,
        dados: rows,
        mensagem: 'Clientes listados com sucesso.'
      });
    } catch (error) {
      return res.status(500).json({
        sucesso: false,
        dados: null,
        mensagem: 'Erro ao consultar clientes no banco de dados.'
      });
    }
  }

  async criarCliente(req, res) {
    try {
      const nome = String(req.body?.nome || '').trim();
      const telefone = String(req.body?.telefone || '').trim();

      if (nome.length < 2 || telefone.replace(/\D/g, '').length < 10) {
        return res.status(400).json({
          sucesso: false,
          dados: null,
          mensagem: 'Informe um nome válido e um telefone com DDD.'
        });
      }

      const [result] = await this.pool.execute(
        'INSERT INTO clientes (nome, telefone) VALUES (?, ?)',
        [nome, telefone]
      );

      const [rows] = await this.pool.execute(
        'SELECT id, nome, telefone, criado_em FROM clientes WHERE id = ?',
        [result.insertId]
      );

      return res.status(201).json({
        sucesso: true,
        dados: rows[0],
        mensagem: 'Cliente cadastrado com sucesso.'
      });
    } catch (error) {
      return res.status(500).json({
        sucesso: false,
        dados: null,
        mensagem: 'Erro ao cadastrar cliente no banco de dados.'
      });
    }
  }

  async listarEquipamentos(req, res) {
    try {
      const [rows] = await this.pool.execute(
        `SELECT e.id, e.cliente_id, e.modelo, e.numero_serie, e.criado_em, c.nome AS cliente_nome
         FROM equipamentos e
         INNER JOIN clientes c ON c.id = e.cliente_id
         ORDER BY e.id DESC`
      );

      return res.status(200).json({
        sucesso: true,
        dados: rows,
        mensagem: 'Equipamentos listados com sucesso.'
      });
    } catch (error) {
      return res.status(500).json({
        sucesso: false,
        dados: null,
        mensagem: 'Erro ao consultar equipamentos no banco de dados.'
      });
    }
  }

  async criarEquipamento(req, res) {
    try {
      const clienteId = Number(req.body?.clienteId || 1);
      const modelo = String(req.body?.modelo || '').trim();
      const numeroSerie = String(req.body?.numeroSerie || '').trim();

      const equipamento = new Equipamento(null, clienteId, modelo, numeroSerie);

      const [clientes] = await this.pool.execute(
        'SELECT id FROM clientes WHERE id = ?',
        [equipamento.clienteId]
      );

      if (!clientes.length) {
        return res.status(404).json({
          sucesso: false,
          dados: null,
          mensagem: 'Cliente vinculado não encontrado.'
        });
      }

      const [result] = await this.pool.execute(
        'INSERT INTO equipamentos (cliente_id, modelo, numero_serie) VALUES (?, ?, ?)',
        [equipamento.clienteId, equipamento.modelo, equipamento.numeroSerie]
      );

      const [rows] = await this.pool.execute(
        'SELECT id, cliente_id, modelo, numero_serie, criado_em FROM equipamentos WHERE id = ?',
        [result.insertId]
      );

      return res.status(201).json({
        sucesso: true,
        dados: rows[0],
        mensagem: 'Equipamento cadastrado com sucesso.'
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          sucesso: false,
          dados: null,
          mensagem: 'Já existe um equipamento cadastrado com este número de série.'
        });
      }

      if (error.message && error.message.includes('obrigatóri')) {
        return res.status(400).json({
          sucesso: false,
          dados: null,
          mensagem: error.message
        });
      }

      return res.status(500).json({
        sucesso: false,
        dados: null,
        mensagem: 'Erro ao cadastrar equipamento no banco de dados.'
      });
    }
  }
}

module.exports = CadastrosController;