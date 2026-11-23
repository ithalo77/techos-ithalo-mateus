# Dossiê de Concepção — Bloco 1 (Sprint 1) | Sistema TechOS

- **Estudante:** Ithalo Mateus Santos Bezerra
- **Curso / Unidade:** Técnico em Desenvolvimento de Sistemas — SENAI PE (Unidade Belo Jardim)[cite: 2]
- **Docente Responsável:** Ryan Oliveira[cite: 2]
- **Marco de Entrega:** Release `v1.0-concepcao`[cite: 2, 7]

## 1. Visão Sistêmica e Arquitetura (Encontro 02)
- Arquitetura cliente-servidor em 3 camadas desacopladas: Frontend (`HTML5`, `CSS3`, `JavaScript`), Backend (`Node.js` ou `PHP/XAMPP` via `HTTP/JSON`) e Banco de Dados (`MySQL` na porta `3306` via `SQL/TCP`)[cite: 2, 3].
- Diagrama disponível em `docs/arquitetura-techos.png`[cite: 3].

## 2. Requisitos Não Funcionais — ISO/IEC 25010 (Encontro 03)
- Especificação em `docs/RNF.md` cobrindo desempenho (até `250 ms` sob `50` requisições simultâneas), segurança (`bcrypt`/`password_hash` com custo `>= 10` e `Bearer JWT` com expiração de `8 horas`), acessibilidade (`WCAG 2.1`, contraste mínimo `4.5:1`), responsividade, transações ACID e manutenibilidade[cite: 4, 19, 24].

## 3. Gestão Ágil, User Stories e Estimativas (Encontros 04 a 08)
- Quadro Kanban no GitHub Projects (`Backlog`, `To Do`, `In Progress` com limite WIP de 2, `Validation` e `Done`)[cite: 4, 5].
- 6 User Stories no padrão `INVEST + BDD` (`[US01]` a `[US06]`) cadastradas nas Issues, estimadas em Fibonacci (`docs/ESTIMATIVAS.md`) e organizadas com Milestones e Labels[cite: 5, 6].
- Acordos e Daily Log registados em `docs/DEV_CHARTER.md`[cite: 6].

## 4. Stack Tecnológica Definida (Encontro 09)
- Detalhamento comparativo em `docs/STACK_TECNOLOGICA.md`, com escolha de `HTML5/CSS3/JS` no frontend, `Node.js` no backend e `MySQL` (XAMPP / MySQL Workbench) no banco de dados[cite: 2, 7].