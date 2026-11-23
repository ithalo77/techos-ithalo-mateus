# Estimativas Técnicas — TechOS

| ID | User Story | Story Points (Fibonacci) | Sprint Alvo |
| :--- | :--- | :---: | :---: |
| US01 | Autenticação de Usuário (Login) | 8 | Sprint 3 |
| US02 | Cadastro e Gestão de Clientes | 3 | Sprint 3 / 4 |
| US03 | Cadastro de Equipamentos por Cliente | 3 | Sprint 3 / 4 |
| US04 | Abertura de Ordem de Serviço | 5 | Sprint 3 |
| US05 | Atualização de Status e Encerramento de Ordem de Serviço | 8 | Sprint 3 / 4 |
| US06 | Listagem, Filtros e Relatório de Ordens de Serviço | 5 | Sprint 3 / 4 |

## Justificativa para Histórias com 8+ Pontos

- **US01 (8 pontos):** Requer armazenamento seguro de senhas com hash `bcrypt` ou `password_hash` (custo `>= 10`), emissão de token `Bearer JWT` com expiração de 8 horas e validação por *middleware* nas rotas privadas[cite: 4, 5, 15, 27].
- **US05 (8 pontos):** Envolve validação de transição de status da Ordem de Serviço, atualização do valor do serviço e execução de transação SQL (`COMMIT` / `ROLLBACK`) para manter a integridade ACID[cite: 5, 19].