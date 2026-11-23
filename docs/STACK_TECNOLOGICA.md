# Seleção de Stack Tecnológica — TechOS

## Comparativo: Node.js vs. PHP

| Critério | Node.js (+ Express) | PHP 8 (+ Apache / XAMPP) |
| :--- | :--- | :--- |
| **Pacotes e ecossistema** | `npm` (`express`, `mysql2`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `cors`)[cite: 11, 16, 18] | `Composer` (`firebase/php-jwt`, `vlucas/phpdotenv`) e PDO nativo[cite: 11, 18] |
| **Modelo de execução** | *Event Loop* assíncrono não bloqueante | Modelo *Request/Response* gerido pelo servidor web (Apache via XAMPP)[cite: 2, 7] |
| **JSON e MySQL** | Manipulação nativa de objetos JS/JSON e conexão via `mysql2` / MySQL Workbench (porta `3306`)[cite: 2, 7, 18] | `json_encode`/`json_decode` e conexão relacional via PDO / MySQL Workbench (porta `3306`)[cite: 2, 7, 18] |

## Stack Escolhida e Vínculo com os RNFs
- **Stack escolhida:** **HTML5, CSS3 e JavaScript** no frontend, **Node.js** no backend e **MySQL** (via XAMPP / MySQL Workbench) na persistência[cite: 2, 7].
- **Justificativa:** Mantém JavaScript do frontend ao backend, facilita payloads JSON assíncronos e atende a **RNF01** (resposta em até 250 ms sob 50 requisições simultâneas), **RNF02** (`bcrypt` com custo `>= 10`), **RNF03** (JWT com expiração de 8h) e **RNF06** (transações ACID `COMMIT`/`ROLLBACK`)[cite: 4, 7, 15, 19].