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
