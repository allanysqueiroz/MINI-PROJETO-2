const express = require('express');
const app = express();
const tarefasRoutes = require('./routes/tarefas');

app.use(express.json());
app.get('/', (req, res) => res.send('API To-Do simples'));
app.use('/tarefas', tarefasRoutes);

module.exports = app;
