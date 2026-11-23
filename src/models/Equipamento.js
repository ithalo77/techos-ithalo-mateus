class Equipamento {
  constructor(id, clienteId, modelo, numeroSerie) {
    if (!clienteId) {
      throw new Error('Cliente é obrigatório para cadastrar o equipamento.');
    }
    if (!modelo || !modelo.trim()) {
      throw new Error('Modelo do equipamento é obrigatório.');
    }
    if (!numeroSerie || !numeroSerie.trim()) {
      throw new Error('Número de série é obrigatório.');
    }

    this.id = id;
    this.clienteId = clienteId;
    this.modelo = modelo.trim();
    this.numeroSerie = numeroSerie.trim();
  }
}

module.exports = Equipamento;