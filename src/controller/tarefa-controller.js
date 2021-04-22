const tarefaModel = require("../model/tarefas.js");
const tarefaDao = require("../DAO/tarefa-dao.js");

function tarefaController(app, bd) {
  const DAO = new tarefaDao(bd);

  app.get("/tarefas", async (req, res) => {
    try {
      let tarefaListada = await DAO.listaTarefas();
      console.log(tarefaListada);
      res.status(200).send(tarefaListada);
    } catch (e) {
      res.status(500).send({ mensagem: "Falha ao listar tarefa" });
    }
  });

  app.get("/tarefas/:titulo", async(req, res) => {
    try {
      const titulo = req.params.titulo;
      let tarefaListadaPorTitulo = await DAO.listaTituloPorTarefas(titulo);
      res.status(200).send(tarefaListadaPorTitulo);
    } catch (e) {
      res.status(500).send({ mensagem: "Falha ao listar tarefa" });
    }
  });

  app.post("/tarefas", async (req, res) => {
    try {
      const tarefa = req.body;

      const novaTarefa = new tarefaModel(
        0,
        tarefa.TITULO,
        tarefa.DESCRICAO,
        tarefa.STATUS,
        tarefa.DATACRIACAO,
        tarefa.ID_USUARIO
      );

      let novaTarefaCriada = await DAO.insereTarefa(novaTarefa);
      res.status(201).send(novaTarefaCriada);
    } catch (e) {
      res.status(400).send({ mensagem: "Falha ao criar tarefa" });
    }
  });

  app.delete("/tarefas/:titulo", async(req, res) => {
   try{
    let titulo = req.params.titulo;
    await DAO.deletaTarefa(titulo)
    res.status(200).send({ mensagem: "tarefa deletada com sucesso" });
  } catch (e) {
    res.status(500).send({ mensagem: "Falha ao deletar tarefa" });
  }
  });

  app.put("/tarefas/:titulo", async(req, res) => {
    try{
    let titulo = req.params.titulo;
    const body = req.body;
    await DAO.alteraTarefa(titulo, body)
    res.status(202).send({ mensagem: "tarefa alterada com sucesso" });
  } catch (e) {
    res.status(500).send({ mensagem: "Falha ao alterar tarefa" });
  }
});
}

module.exports = tarefaController;
