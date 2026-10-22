'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const model = require('../src/models/cliente.model');

test.beforeEach(() => model._reiniciarParaTeste());

test('lista os clientes iniciais com id, nome e email', () => {
  const clientes = model.listar();
  assert.equal(clientes.length, 3);
  assert.deepEqual(Object.keys(clientes[0]), ['id', 'nome', 'email']);
});

test('consulta cliente por id', () => {
  assert.equal(model.consultar('1').nome, 'Ana Silva');
  assert.equal(model.consultar('inexistente'), null);
});

test('cadastra cliente e normaliza email', () => {
  const cliente = model.cadastrar({ nome: '  Joana Lima  ', email: ' JOANA@EXAMPLE.COM ' });
  assert.ok(cliente.id);
  assert.equal(cliente.nome, 'Joana Lima');
  assert.equal(cliente.email, 'joana@example.com');
});

test('altera cliente sem modificar os campos não enviados', () => {
  const cliente = model.alterar('1', { nome: 'Ana Nova' });
  assert.equal(cliente.nome, 'Ana Nova');
  assert.equal(cliente.email, 'ana.silva@example.com');
  assert.equal(model.alterar('inexistente', { nome: 'X' }), null);
});

test('exclui cliente', () => {
  assert.equal(model.excluir('1'), true);
  assert.equal(model.consultar('1'), null);
  assert.equal(model.excluir('inexistente'), false);
});
