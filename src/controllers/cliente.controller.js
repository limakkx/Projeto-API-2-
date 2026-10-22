'use strict';

const model = require('../models/cliente.model');

function validarCampos(body, { parcial = false } = {}) {
  const erros = [];
  const campos = ['nome', 'email'];

  for (const campo of campos) {
    if (parcial && body[campo] === undefined) continue;
    if (typeof body[campo] !== 'string' || body[campo].trim() === '') {
      erros.push(`O campo ${campo} é obrigatório e deve ser texto.`);
    }
  }

  if (body.email !== undefined && typeof body.email === 'string' && body.email.trim() !== '') {
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(body.email.trim())) erros.push('Informe um email válido.');
  }

  if (parcial && body.nome === undefined && body.email === undefined) {
    erros.push('Informe pelo menos um campo para alterar: nome ou email.');
  }
  return erros;
}

function listar(req, res) {
  return res.status(200).json(model.listar());
}

function consultar(req, res) {
  const cliente = model.consultar(req.params.id);
  if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado.' });
  return res.status(200).json(cliente);
}

function cadastrar(req, res) {
  const erros = validarCampos(req.body);
  if (erros.length) return res.status(400).json({ erro: 'Dados inválidos.', detalhes: erros });

  const cliente = model.cadastrar(req.body);
  return res.status(201).json(cliente);
}

function alterar(req, res) {
  const erros = validarCampos(req.body, { parcial: true });
  if (erros.length) return res.status(400).json({ erro: 'Dados inválidos.', detalhes: erros });

  const cliente = model.alterar(req.params.id, req.body);
  if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado.' });
  return res.status(200).json(cliente);
}

function excluir(req, res) {
  const removido = model.excluir(req.params.id);
  if (!removido) return res.status(404).json({ erro: 'Cliente não encontrado.' });
  return res.status(204).end();
}

module.exports = { listar, consultar, cadastrar, alterar, excluir };
