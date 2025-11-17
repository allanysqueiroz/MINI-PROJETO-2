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
