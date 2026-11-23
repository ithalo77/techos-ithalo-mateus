# Requisitos Não Funcionais (RNF) — TechOS

- **RNF01 [Desempenho / Eficiência de Performance — ISO/IEC 25010]:** Endpoints da API REST devem responder em até **250 ms** sob carga de **50 requisições simultâneas**[cite: 4, 24].
- **RNF02 [Segurança OWASP — ISO/IEC 25010]:** Senhas de utilizadores devem ser armazenadas com hash `bcrypt` ou `password_hash` utilizando fator de custo **>= 10**[cite: 4, 24].
- **RNF03 [Segurança JWT — ISO/IEC 25010]:** Rotas privadas devem exigir token `Bearer JWT` com tempo de expiração de **8 horas**[cite: 4, 24].
- **RNF04 [Acessibilidade WCAG 2.1 / Usabilidade — ISO/IEC 25010]:** A interface web deve manter taxa de contraste mínima de **4.5:1** para textos normais e navegação completa via teclado[cite: 4, 24].
- **RNF05 [Usabilidade / Responsividade — ISO/IEC 25010]:** As telas devem adaptar-se sem barra de rolagem horizontal em ecrãs de **375px** (mobile) a **1920px** (desktop) e atingir pontuação **>= 85** no Google Lighthouse em Acessibilidade e Boas Práticas[cite: 12, 20, 24].
- **RNF06 [Confiabilidade / Integridade — ISO/IEC 25010]:** Operações críticas como encerramento e atualização de Ordens de Serviço no MySQL devem usar transações (`COMMIT` / `ROLLBACK`) para garantir **100%** de integridade em caso de erro[cite: 19, 24].
- **RNF07 [Disponibilidade / Segurança — ISO/IEC 25010]:** O ambiente em produção na nuvem deve operar via protocolo **HTTPS** com disponibilidade alvo **>= 99%** durante o período de avaliação[cite: 21, 24].
- **RNF08 [Manutenibilidade / Testabilidade — ISO/IEC 25010]:** O código deve seguir arquitetura **MVC** (`models`, `controllers`, `views`, `routes`) com suíte de testes automatizados cobrindo fluxos principais (`200`, `201`, `401`)[cite: 11, 16, 24].