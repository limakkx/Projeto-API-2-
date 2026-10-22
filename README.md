# CRUD de Clientes — Node.js, Express e Expo Snack

Projeto académico de CRUD de clientes com API REST em Node.js + Express, organizado em MVC. A pasta `expo-snack` contém o `App.js` para colar num novo projeto no Expo Snack.

## Requisitos

- Node.js 18.11 ou superior
- npm
- VS Code (opcional)

## Abrir e executar no VS Code

1. Descompacte `clientes-api-expo.zip` ou abra diretamente esta pasta no VS Code.
2. No terminal integrado, execute:

```bash
npm install
npm run dev
```

3. Abra `http://localhost:3000` para ver a descrição da API e `http://localhost:3000/api/clientes` para listar os clientes.

Para executar em modo normal, use `npm start`. Para executar os testes automatizados, use `npm test`.

## Estrutura MVC

```text
src/
├── app.js                         # configuração Express, CORS e middleware
├── server.js                      # inicialização na porta do ambiente
├── controllers/cliente.controller.js
├── models/cliente.model.js        # operações e armazenamento de clientes
└── routes/cliente.routes.js       # endpoints REST
expo-snack/App.js                  # app React Native para colar no Snack
test/cliente.model.test.js         # testes do modelo
PROMPT_IA.txt                      # prompt utilizado e IA(s) utilizada(s)
```

O cadastro contém os três campos pedidos: `id`, `nome` e `email`. O `id` é gerado automaticamente. A API inclui três clientes de exemplo para a primeira demonstração.

## Endpoints

| Método | URL | Ação |
|---|---|---|
| `GET` | `/api/clientes` | Listar clientes |
| `POST` | `/api/clientes` | Cadastrar cliente |
| `GET` | `/api/clientes/:id` | Consultar um cliente |
| `PUT` ou `PATCH` | `/api/clientes/:id` | Alterar nome e/ou email |
| `DELETE` | `/api/clientes/:id` | Excluir cliente |

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Mariana Oliveira","email":"mariana@example.com"}'
```

O GET de listagem retorna uma matriz JSON. Os pedidos inválidos recebem HTTP 400; IDs inexistentes recebem HTTP 404.

## Nota sobre armazenamento

Para manter o projeto simples e pronto para executar sem chaves de serviços externos, os registos ficam em memória no processo Node.js. As operações CRUD funcionam enquanto o servidor está ativo; os novos registos e alterações são reiniciados quando o processo é reiniciado. Os três clientes de exemplo voltam a aparecer. Se a atividade exigir persistência permanente, será necessário ligar uma base de dados, como o Firebase usado no tutorial de referência, e configurar as credenciais no Render.

## Publicar manualmente no GitHub

1. Crie no GitHub um repositório (público se o professor precisar de o abrir).
2. No terminal desta pasta, execute os comandos abaixo e substitua o endereço pelo URL do seu repositório:

```bash
git init
git add .
git commit -m "CRUD de clientes com API REST"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

`node_modules` e ficheiros `.env` estão excluídos pelo `.gitignore`.

## Publicar no Render

1. No Render, escolha **New → Web Service** e ligue o repositório GitHub.
2. Configure **Runtime/Language: Node**, **Build Command: `npm install`** e **Start Command: `npm start`**.
3. Aguarde o deploy e abra o domínio `https://SEU-SERVICO.onrender.com`.
4. Verifique `https://SEU-SERVICO.onrender.com/api/clientes`. Deve aparecer uma lista JSON.

O servidor lê `process.env.PORT`, conforme esperado pelo Render. A API habilita CORS para que o Snack possa fazer pedidos.

## Configurar o Expo Snack

1. Crie um Snack em [snack.expo.dev](https://snack.expo.dev).
2. Abra `expo-snack/App.js` nesta pasta e copie o conteúdo para o `App.js` do Snack.
3. No início do ficheiro, substitua `https://SEU-SERVICO.onrender.com/api/clientes` pelo endereço real do Render seguido de `/api/clientes`.
4. Execute o preview do Snack. A lista mostrará `nome`, `email` e `id` recebidos pela API. O botão **Atualizar lista** e o gesto de puxar para baixo fazem um novo GET.
5. Guarde e partilhe o link do Snack com o professor.

## Referências

- [Tutorial fornecido: CRUD, API, Render e Expo Snack](https://tutorial-nodejs-api-reactnative.vercel.app/)
- [Documentação oficial do Render — Node + Express](https://render.com/docs/deploy-node-express-app)
- [Documentação oficial do Express — Routing](https://expressjs.com/en/5x/guide/routing/)
- [Documentação do React Native — Networking e Fetch](https://reactnative.dev/docs/network)
