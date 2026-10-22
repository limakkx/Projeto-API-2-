'use strict';

const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/cliente.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    aplicacao: 'API de Clientes',
    versao: '1.0.0',
    status: 'online',
    endpoints: {
      listar: 'GET /api/clientes',
      cadastrar: 'POST /api/clientes',
      consultar: 'GET /api/clientes/:id',
      alterar: 'PUT ou PATCH /api/clientes/:id',
      excluir: 'DELETE /api/clientes/:id'
    }
  });
});

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/clientes', clienteRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ erro: 'O corpo da requisição contém JSON inválido.' });
  }
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
});

module.exports = app;
