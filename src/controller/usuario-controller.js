const UsuarioModel = require("../model/usuario");
const UsuarioDAO = require("../DAO/usuario-dao.js");

function usuarioController(app, bd) {
  const DAO = new UsuarioDAO(bd);

  app.get("/usuario", (req, res) => {
    DAO.listaUsuarios()
      .then((usuarios) => res.send(usuarios))
      .catch((err) => res.send(`Erro: ${err} na consulta`));
  });

  
  app.get("/usuario/:email", (req, res) => {
    let email = req.params.email;
    DAO.listaUsuarioPorEmail(email)
      .then((usuarios) => res.send(usuarios))
      .catch((err) => res.send(`Erro: ${err} na consulta`));
  });

  app.post("/usuario", (req, res) => {
    const body = req.body;
    console.log(body);

    const usuarios = new UsuarioModel(0, body.NOME, body.EMAIL, body.SENHA);
    DAO.insereUsuarios(usuarios)
      .then((usuarios) => res.send(usuarios))
      .catch((err) => res.send(`${err}`));
  });

  app.delete("/usuario/:id", (req, res) => {
    let email = req.params.id;
    DAO.deletaUsuario(email)
    .then((mensagemSucesso) => res.send({mensagem: mensagemSucesso}))
    .catch((mensagemFalha) => res.send({mensagem: mensagemFalha}));
  });

  app.put("/usuario/:email", (req, res) => {
    let email = req.params.email;
    const body = req.body;
    console.log(body);
    DAO.alteraUsuario(email,body)
    .then((mensagemSucesso) => res.send({mensagem: mensagemSucesso}))
    .catch((mensagemFalha) => res.send({mensagem: mensagemFalha}));
  });
}

module.exports = usuarioController;
