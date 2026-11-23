import { aplicarMascaraTelefone, validarTextoObrigatorio } from './mascaras.js';
import { criarAlerta } from './alerta.js';

const elementoAlerta = document.getElementById('alerta-feedback');
const alerta = criarAlerta(elementoAlerta);

const kpiAbertas = document.getElementById('kpi-abertas');
const kpiAndamento = document.getElementById('kpi-andamento');
const kpiConcluidas = document.getElementById('kpi-concluidas');
const listaOs = document.getElementById('lista-os');
const filtroStatus = document.getElementById('filtro-status');
const estadoSessao = document.getElementById('estado-sessao');

function obterToken() {
  return sessionStorage.getItem('techos_token') || '';
}

function atualizarEstadoSessao() {
  if (!estadoSessao) return;
  const nomeUsuario = sessionStorage.getItem('techos_usuario');
  const token = obterToken();

  if (token && nomeUsuario) {
    estadoSessao.textContent = `Sessão ativa: ${nomeUsuario} (JWT configurado)`;
  } else {
    estadoSessao.textContent = 'Sessão: não autenticado';
  }
}

function atualizarKpis(ordens) {
  if (!kpiAbertas || !kpiAndamento || !kpiConcluidas) return;

  kpiAbertas.textContent = String(ordens.filter((os) => os.status === 'ABERTA').length);
  kpiAndamento.textContent = String(ordens.filter((os) => os.status === 'EM_ANDAMENTO').length);
  kpiConcluidas.textContent = String(ordens.filter((os) => os.status === 'CONCLUIDA').length);
}

function renderizarOrdens(ordens) {
  if (!listaOs) return;

  listaOs.innerHTML = '';
  if (!ordens.length) {
    const vazio = document.createElement('li');
    vazio.className = 'item-os';
    vazio.textContent = 'Nenhuma ordem de serviço encontrada.';
    listaOs.appendChild(vazio);
    return;
  }

  for (const os of ordens) {
    const item = document.createElement('li');
    item.className = 'item-os';
    item.textContent = `#${os.id} — ${os.descricaoDefeito} | Status: ${os.status} | Valor: R$ ${Number(os.valorServico || 0).toFixed(2)}`;
    listaOs.appendChild(item);
  }
}

async function carregarOrdens() {
  try {
    const statusSelecionado = filtroStatus ? filtroStatus.value : 'TODAS';
    const url = statusSelecionado && statusSelecionado !== 'TODAS'
      ? `/api/os?status=${encodeURIComponent(statusSelecionado)}`
      : '/api/os';

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || 'Falha ao consultar ordens de serviço.');
    }

    const lista = Array.isArray(dados.dados) ? dados.dados : [];
    renderizarOrdens(lista);

    if (!statusSelecionado || statusSelecionado === 'TODAS') {
      atualizarKpis(lista);
    }
  } catch (erro) {
    alerta.mostrar(erro.message || 'Erro de comunicação com o servidor.', 'erro');
  }
}

const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const email = formLogin.email.value.trim();
    const senha = formLogin.senha.value;

    if (!email || !senha) {
      alerta.mostrar('Informe e-mail e senha para autenticar.', 'erro');
      return;
    }

    try {
      const resposta = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const resultado = await resposta.json();
      if (!resposta.ok || !resultado.dados?.token) {
        throw new Error(resultado.mensagem || 'Falha na autenticação.');
      }

      sessionStorage.setItem('techos_token', resultado.dados.token);
      sessionStorage.setItem('techos_usuario', resultado.dados.usuario?.nome || email);
      atualizarEstadoSessao();
      alerta.mostrar('Login realizado com sucesso.', 'sucesso');
    } catch (erro) {
      alerta.mostrar(erro.message || 'Erro ao autenticar.', 'erro');
    }
  });
}

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

const formOs = document.getElementById('form-os');
if (formOs) {
  formOs.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const descricaoDefeito = formOs.descricaoDefeito.value;
    const valorServico = Number(formOs.valorServico.value || 0);

    if (!validarTextoObrigatorio(descricaoDefeito)) {
      alerta.mostrar('Descreva o defeito antes de abrir a Ordem de Serviço.', 'erro');
      return;
    }

    const token = obterToken();
    if (!token) {
      alerta.mostrar('Faça login primeiro para obter o token JWT.', 'erro');
      return;
    }

    try {
      const resposta = await fetch('/api/os', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          clienteId: 1,
          equipamentoId: 1,
          descricaoDefeito: descricaoDefeito.trim(),
          valorServico
        })
      });

      const resultado = await resposta.json();
      if (!resposta.ok) {
        throw new Error(resultado.mensagem || 'Não foi possível abrir a Ordem de Serviço.');
      }

      alerta.mostrar('Ordem de serviço registada com status ABERTA.', 'sucesso');
      formOs.reset();
      await carregarOrdens();
    } catch (erro) {
      alerta.mostrar(erro.message || 'Erro ao enviar Ordem de Serviço.', 'erro');
    }
  });
}

if (filtroStatus) {
  filtroStatus.addEventListener('change', () => {
    carregarOrdens();
  });
}

atualizarEstadoSessao();
carregarOrdens();