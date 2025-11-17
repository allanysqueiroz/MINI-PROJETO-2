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
