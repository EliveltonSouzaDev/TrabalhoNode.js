const tarefaModel = require("../model/tarefas.js");
const tarefaDao = require("../DAO/tarefa-dao.js");

function tarefaController(app, bd) {
  const DAO = new tarefaDao(bd);

  app.get("/tarefas", (req, res) => {
    DAO.listaTarefas()
      .then((tarefas) => res.send(tarefas))
      .catch((err) => res.send(err));
  });

  app.get("/tarefas/:titulo", (req, res) => {
    const titulo = req.params.titulo;
    DAO.listaTituloPorTarefas(titulo)
      .then((titulo) => res.send(titulo))
      .catch((err) => res.send(`Erro: ${err} na consulta`));
  });

  app.post("/tarefas", (req, res) => {
    const tarefa = req.body;

    const tarefas = new tarefaModel(
      0,
      tarefa.TITULO,
      tarefa.DESCRICAO,
      tarefa.STATUS,
      tarefa.DATACRIACAO,
      tarefa.ID_USUARIO
    );
    DAO.insereTarefa(tarefas)
      .then((tarefas) => res.send(tarefas))
      .catch((err) => res.send(`${err}`));
  });

  app.delete("/tarefas/:titulo", (req, res) => {
    let titulo = req.params.titulo;
    DAO.deletaTarefa(titulo)
      .then((mensagemSucesso) => res.send({ mensagem: mensagemSucesso }))
      .catch((mensagemFalha) => res.send({ mensagem: mensagemFalha }));
  });

  app.put("/tarefas/:titulo", (req, res) => {
    let titulo = req.params.titulo;
    const body = req.body;
    console.log(body);
    DAO.alteraTarefa(titulo, body)
      .then((mensagemSucesso) => res.send({ mensagem: mensagemSucesso }))
      .catch((mensagemFalha) => res.send({ mensagem: mensagemFalha }));
  });
}

module.exports = tarefaController;
