# Roteiro de Testes — Bloco 3 (Sprint 3: Frontend e API REST)

## Cenários Verificados
1. **Acesso não autorizado (`401`):** Requisição `POST /api/os` sem cabeçalho `Authorization: Bearer <token>` retorna `401`.
2. **Autenticação válida (`200`):** `POST /api/auth/login` com credenciais válidas retorna token JWT válido por `8h`.
3. **Validação de payload (`400`):** `POST /api/os` com `descricaoDefeito` ausente/curta ou `valorServico` negativo retorna `400`.
4. **Criação e listagem (`201` / `200`):** `POST /api/os` autenticado cria OS com status inicial `ABERTA`; `GET /api/os` e `GET /api/os?status=ABERTA` retornam os registos e atualizam os KPIs na interface.
5. **Rota inexistente (`404`):** Requisição a rota não mapeada retorna `404` com formato JSON padronizado.