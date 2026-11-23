export function criarAlerta(elemento) {
  let temporizador = null;

  function mostrar(mensagem, tipo = 'sucesso') {
    if (!elemento) return;

    clearTimeout(temporizador);
    elemento.textContent = mensagem;
    elemento.className = `alerta alerta--${tipo}`;

    temporizador = setTimeout(() => {
      elemento.textContent = '';
      elemento.className = 'alerta oculto';
    }, 4000);
  }

  return { mostrar };
}