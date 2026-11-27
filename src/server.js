require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const AuthController = require('./controllers/AuthController');
const osRoutes = require('./routes/osRoutes');

const app = express();
const port = Number(process.env.APP_PORT) || 3000;
const authController = new AuthController();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/auth/login', (req, res) => authController.login(req, res));
app.use('/api/os', osRoutes);

const cadastrosRoutes = require('./routes/cadastrosRoutes');
// ...
app.use('/api', cadastrosRoutes);

app.use((req, res) => {
  return res.status(404).json({
    sucesso: false,
    dados: null,
    mensagem: 'Rota não encontrada.'
  });
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    sucesso: false,
    dados: null,
    mensagem: 'Erro interno no servidor.'
  });
});

app.listen(port, () => {
  console.log(`Servidor TechOS ativo em http://localhost:${port}`);
});