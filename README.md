Projeto To-Do simples. 
API REST para gerenciamento de tarefas desenvolvida com Node.js, Express e Sequelize.

📋 Sobre o Projeto
Este projeto é uma API completa para gerenciar listas de tarefas (To-Do List), permitindo criar, listar, atualizar e deletar tarefas. Desenvolvido seguindo as melhores práticas de arquitetura MVC e padrões REST.

🚀 Tecnologias Utilizadas
Node.js - Ambiente de execução JavaScript
Express - Framework web para Node.js
Sequelize - ORM para banco de dados
SQLite - Banco de dados relacional
dotenv - Gerenciamento de variáveis de ambiente

mini_projeto_2/
├─ .env.example
├─ package.json
├─ README.md
└─ src/
   ├─ server.js
   ├─ app.js
   ├─ routes/
   │  └─ tarefas.js
   ├─ controllers/
   │  └─ tarefaController.js
   ├─ models/
   │  ├─ index.js
   │  └─ tarefa.js


📄 README.md
# Mini Projeto To-Do (simples)

API REST para gerenciar tarefas usando Node.js, Express, Sequelize e SQLite.

## 🚀 Como rodar

1. Crie um arquivo `.env` com base no `.env.example`
2. Instale as dependências:


npm install

3. Inicie o servidor:


npm start

4. A API rodará em:  
http://localhost:3000

## 📌 Endpoints

- POST `/tarefas` — criar tarefa  
- GET `/tarefas` — listar todas  
- GET `/tarefas/:id` — buscar por ID  
- PUT `/tarefas/:id` — atualizar tudo  
- PATCH `/tarefas/:id/status` — atualizar só o status  
- DELETE `/tarefas/:id` — deletar  

## 🔧 Tecnologias
Node.js, Express, Sequelize, SQLite, dotenv

## ✨ Observação
O projeto usa `sequelize.sync()` para criar a tabela automaticamente.

📁 src/
📄 src/server.js
require('dotenv').config();
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.sequelize.sync();
    console.log('DB sincronizado');
    app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
start();

📄 src/app.js
const express = require('express');
const app = express();
const tarefasRoutes = require('./routes/tarefas');

app.use(express.json());

app.get('/', (req, res) => res.send('API To-Do simples'));

app.use('/tarefas', tarefasRoutes);

module.exports = app;

📁 src/routes/tarefas.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefaController');
const validate = require('../middlewares/validateTarefa');

router.post('/', validate, controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.put('/:id', validate, controller.atualizar);
router.patch('/:id/status', validate, controller.atualizarStatus);
router.delete('/:id', controller.deletar);

module.exports = router;

📁 src/controllers/tarefaController.js
const db = require('../models');
const Tarefa = db.Tarefa;

module.exports = {
  async criar(req, res) {
    try {
      const { titulo, descricao, status } = req.body;
      const tarefa = await Tarefa.create({ titulo, descricao, status });
      return res.status(201).json(tarefa);
    } catch (err) {
      return res.status(500).json({ error: 'erro ao criar' });
    }
  },

  async listar(req, res) {
    try {
      const tarefas = await Tarefa.findAll();
      return res.json(tarefas);
    } catch {
      return res.status(500).json({ error: 'erro ao listar' });
    }
  },

  async buscarPorId(req, res) {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ error: 'não encontrada' });
    return res.json(tarefa);
  },

  async atualizar(req, res) {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ error: 'não encontrada' });
    Object.assign(tarefa, req.body);
    await tarefa.save();
    return res.json(tarefa);
  },

  async atualizarStatus(req, res) {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ error: 'não encontrada' });
    tarefa.status = req.body.status;
    await tarefa.save();
    return res.json(tarefa);
  },

  async deletar(req, res) {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ error: 'não encontrada' });
    await tarefa.destroy();
    return res.status(204).send();
  }
};

📁 src/models/index.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_STORAGE || './database.sqlite',
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Tarefa = require('./tarefa')(sequelize, Sequelize);

module.exports = db;

📁 src/models/tarefa.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Tarefa', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    descricao: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('a fazer','em andamento','concluída'),
      defaultValue: 'a fazer'
    }
  }, { tableName: 'tarefas' });
};

📁 src/middlewares/validateTarefa.js
const allowed = ['a fazer', 'em andamento', 'concluída'];

module.exports = (req, res, next) => {
  const { titulo, status } = req.body || {};

  if ((req.method === 'POST' || req.method === 'PUT') && (!titulo || titulo.trim() === '')) {
    return res.status(400).json({ error: 'titulo obrigatório' });
  }

  if (status && !allowed.includes(status)) {
    return res.status(400).json({ error: 'status inválido' });
  }

  next();
};

📄 Licença
Este projeto está sob a licença MIT.
