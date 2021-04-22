const UsuarioModel = require("../model/usuario");
const UsuarioDAO = require("../DAO/usuario-dao.js");

function usuarioController(app, bd) {
  const DAO = new UsuarioDAO(bd);

  app.get("/usuarios", async (req, res) => {
    try {
      let usuarioListado = await DAO.listaUsuarios();
      console.log(usuarioListado);
      res.status(200).send(usuarioListado);
    } catch (e) {
      res.status(503).send({ mensagem: "Falha ao listar usuarios" });
    }
  });

  app.get("/usuarios/:email", async (req, res) => {
    try {
      let email = req.params.email;
      let usuarioListadoPorEmail = await DAO.listaUsuarioPorEmail(email);
      res.status(200).send(usuarioListadoPorEmail);
    } catch (e) {
      res.status(500).send({ mensagem: "Falha ao listar usuario" });
    }
  });

  app.post("/usuarios", async (req, res) => {
    try {
      const body = req.body;
      const novoUsuario = new UsuarioModel(
        0,
        body.NOME,
        body.EMAIL,
        body.SENHA
      );
      let novoUsuarioCriado = await DAO.insereUsuarios(novoUsuario);
      res.status(201).send(novoUsuarioCriado);
    } catch (e) {
      res.status(500).send({ mensagem: "Falha ao criar novo usuario" });
    }
  });

  app.delete("/usuarios/:email", async (req, res) => {
    try {
      let email = req.params.email;
      await DAO.deletaUsuario(email);
      res.status(200).send({ mensagem: "Usuario deletado com sucesso" });
    } catch (e) {
      res.status(500).send({ mensagem: "Falha ao deletar usuario" });
    }
  });

  app.put("/usuarios/:email", async (req, res) => {
    try {
      let email = req.params.email;
      const body = req.body;
      await DAO.alteraUsuario(email, body);
      res.status(202).send({ mensagem: "Usuario alterado com sucesso" });
    } catch (e) {
      res.status(500).send({ mensagem: "Falha ao alterar usuario" });
    }
  });
}

module.exports = usuarioController;
