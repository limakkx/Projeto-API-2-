'use strict';

const { randomUUID } = require('node:crypto');

const clientesIniciais = [
  { id: '1', nome: 'Ana Silva', email: 'ana.silva@example.com' },
  { id: '2', nome: 'Bruno Costa', email: 'bruno.costa@example.com' },
  { id: '3', nome: 'Carla Santos', email: 'carla.santos@example.com' }
];

let clientes = clonar(clientesIniciais);

function clonar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

function listar() {
  return clonar(clientes);
}

function consultar(id) {
  const cliente = clientes.find((item) => item.id === String(id));
  return cliente ? clonar(cliente) : null;
}

function cadastrar({ nome, email }) {
  const cliente = {
    id: randomUUID(),
    nome: nome.trim(),
    email: email.trim().toLowerCase()
  };
  clientes.push(cliente);
  return clonar(cliente);
}

function alterar(id, dados) {
  const indice = clientes.findIndex((item) => item.id === String(id));
  if (indice === -1) return null;

  const atual = clientes[indice];
  clientes[indice] = {
    ...atual,
    ...(dados.nome !== undefined ? { nome: dados.nome.trim() } : {}),
    ...(dados.email !== undefined ? { email: dados.email.trim().toLowerCase() } : {})
  };
  return clonar(clientes[indice]);
}

function excluir(id) {
  const indice = clientes.findIndex((item) => item.id === String(id));
  if (indice === -1) return false;
  clientes.splice(indice, 1);
  return true;
}

function _reiniciarParaTeste() {
  clientes = clonar(clientesIniciais);
}

module.exports = { listar, consultar, cadastrar, alterar, excluir, _reiniciarParaTeste };
