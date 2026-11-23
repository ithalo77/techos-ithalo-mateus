import { aplicarMascaraTelefone, validarTextoObrigatorio } from './mascaras.js';
import { criarAlerta } from './alerta.js';

const elementoAlerta = document.getElementById('alerta-feedback');
const alerta = criarAlerta(elementoAlerta);

const inputTelefone = document.getElementById('cliente-telefone');
if (inputTelefone) {
  inputTelefone.addEventListener('input', (evento) => {
    evento.target.value = aplicarMascaraTelefone(evento.target.value);
  });
}

const formCliente = document.getElementById('form-cliente');
if (formCliente) {
  formCliente.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = formCliente.nome.value;
    const telefone = formCliente.telefone.value;

    if (!validarTextoObrigatorio(nome) || telefone.replace(/\D/g, '').length < 10) {
      alerta.mostrar('Informe um nome válido e um telefone com DDD.', 'erro');
      return;
    }

    alerta.mostrar(`Cliente "${nome.trim()}" validado com sucesso.`, 'sucesso');
    formCliente.reset();
  });
}

const formEquipamento = document.getElementById('form-equipamento');
if (formEquipamento) {
  formEquipamento.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const modelo = formEquipamento.modelo.value;
    const numeroSerie = formEquipamento.numeroSerie.value;

    if (!validarTextoObrigatorio(modelo) || !validarTextoObrigatorio(numeroSerie)) {
      alerta.mostrar('Preencha modelo e número de série válidos.', 'erro');
      return;
    }

    alerta.mostrar(`Equipamento "${modelo.trim()}" pronto para vínculo.`, 'sucesso');
    formEquipamento.reset();
  });
}

const kpiAbertas = document.getElementById('kpi-abertas');
const formOs = document.getElementById('form-os');
if (formOs && kpiAbertas) {
  formOs.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const defeito = formOs.descricaoDefeito.value;

    if (!validarTextoObrigatorio(defeito)) {
      alerta.mostrar('Descreva o defeito antes de abrir a Ordem de Serviço.', 'erro');
      return;
    }

    const totalAtual = Number(kpiAbertas.textContent) || 0;
    kpiAbertas.textContent = String(totalAtual + 1);
    alerta.mostrar('Ordem de serviço registada com status ABERTA.', 'sucesso');
    formOs.reset();
  });
}