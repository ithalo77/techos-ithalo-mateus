# Fluxo de Interface e Navegação — Sistema TechOS

## Fluxo Principal de Telas
1. **Login (`login.html` / secção de autenticação):** Acesso com e-mail e senha; redireciona para o Painel Principal (`index.html`) após autenticação[cite: 5].
2. **Painel / Relatório de OS:** Exibe totalizadores e filtros por status (`ABERTA`, `EM_ANDAMENTO`, `CONCLUIDA`)[cite: 5].
3. **Cadastro de Clientes:** Formulário de nome e telefone com validação e listagem rápida[cite: 5].
4. **Cadastro de Equipamentos:** Vincula modelo e número de série único a um cliente existente[cite: 5].
5. **Abertura e Atualização de OS:** Regista defeito em nova OS (`ABERTA`) e permite atualizar status e valor do serviço[cite: 5].

## Wireframe de Layout (Desktop e Mobile)
- **Cabeçalho:** Título **TechOS** + navegação por secções/abas acessível via teclado.
- **Área Principal:** Cartões de resumo + formulário de operação + tabela/lista de Ordens de Serviço com rolagem limpa em `375px` e `1920px`[cite: 4, 5].