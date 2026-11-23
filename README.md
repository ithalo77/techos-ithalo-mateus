# Sistema TechOS — Gestão de Ordens de Serviço

- **Estudante:** Ithalo Mateus Santos Bezerra
- **Turma:** Técnico em Desenvolvimento de Sistemas — SENAI Belo Jardim
- **Docente:** Ryan Oliveira

## Arquitetura

O sistema **TechOS** segue uma arquitetura cliente-servidor em 3 camadas desacopladas:

1. **Frontend (Web):** Interface em HTML5, CSS3 e JavaScript que envia requisições HTTP assíncronas com payloads JSON (`GET`, `POST`, `PUT`, `DELETE`).
2. **Backend (API):** Servidor de aplicação (Node.js ou PHP/XAMPP) responsável por validar regras de negócio e comunicar-se via SQL/TCP.
3. **Banco de Dados:** MySQL Server (porta `3306` via XAMPP / MySQL Workbench) para persistência relacional dos dados.

![Arquitetura do Sistema TechOS](docs/arquitetura-techos.png)

## Configuração de Ambiente

1. Copie o ficheiro `.env.example` para `.env` na raiz do projeto.
2. Preencha as credenciais do MySQL (XAMPP) e defina uma chave forte em `JWT_SECRET`.