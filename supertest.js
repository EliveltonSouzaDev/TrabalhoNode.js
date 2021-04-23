const request = require('supertest');
const express = require('express');
const UsuarioDAO = require("./src/DAO/usuario-dao");

const app = express();

app.get("/usuarios", async (req, res) => {
  const DAO = new UsuarioDAO(bd);

    let usuarioListado = await DAO.listaUsuarios();
    console.log(usuarioListado);
    res.status(200).send(usuarioListado)
});

request(app)
  .get('/usuarios')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
