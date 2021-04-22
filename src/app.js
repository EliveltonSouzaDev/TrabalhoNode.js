const express = require('express');
const app = express();
const consign = require('consign'); // consign é para agrupar todas os encapsulamentos.
const cors = require('cors');
const bd = require('./infra/sqlite-db.js');
const usuarioController = require ('./controller/usuario-controller.js');
const tarefaController = require('./controller/tarefa-controller.js');

app.use(cors())
app.use(express.json()) ;

usuarioController(app, bd);
tarefaController(app, bd);

const port = 3000

app.listen(port, () => {
    console.log(`Acesse o localhost http://localhost:${port}`);
  })