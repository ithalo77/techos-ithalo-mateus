# Sistema TechOS — Gestão de Ordens de Serviço

- **Estudante:** Ithalo Mateus Santos Bezerra
- **Turma:** Técnico em Desenvolvimento de Sistemas — SENAI Belo Jardim
- **Docente:** Ryan Oliveira

## Arquitetura

O sistema **TechOS** segue uma arquitetura cliente-servidor em 3 camadas desacopladas:

1. **Frontend (Web):** Interface responsiva em HTML5, CSS3 e JavaScript modular (`375px` a `1920px`, WCAG 2.1) com consumo assíncrono via `fetch` e `async/await`.
2. **Backend (API):** Servidor Node.js com Express, autenticação via `bcryptjs` e `JWT`, validação de payloads e persistência relacional com `mysql2`.
3. **Banco de Dados:** MySQL Server (porta `3306` via XAMPP / MySQL Workbench) modelado em `database/schema.sql`.

![Arquitetura do Sistema TechOS](docs/arquitetura-techos.png)

## Configuração e Execução

1. Copie `.env.example` para `.env` na raiz e ajuste as variáveis do MySQL e `JWT_SECRET`.
2. Execute o script `database/schema.sql` no MySQL (`techos_db`).
3. Instale as dependências com `npm install`.
4. Rode os testes automatizados com `npm test`.
5. Inicie o servidor com `npm start` e abra `http://localhost:3000`.

Para mais detalhes, consulte `docs/DEPLOY_E_OPERACAO.md`.