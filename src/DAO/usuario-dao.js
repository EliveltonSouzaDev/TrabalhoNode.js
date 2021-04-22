module.exports = class UsuariosDAO {
  constructor(bd) {
    this.bd = bd;
  }

  listaUsuarios() {
    return new Promise((res, rej) => {
      this.bd.all("SELECT * FROM TAREFAS", (err, usuarios) => {
        if (err) {
          rej(err);
        } else {
          res(usuarios);
        }
      });
    });
  }

  listaUsuarioPorEmail(email) {
    return new Promise((res, rej) => {
      this.bd.all("SELECT * FROM USUARIOS WHERE EMAIL = (?)", [email],
      (err, usuarios) => {
        if (err) {
          rej(err);
        } else {
          res(usuarios);
        }
      });
    });
  }




  insereUsuarios(usuario) {
    return new Promise((res, rej) => {
      this.bd.run(
        "INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)",
        [usuario.nome, usuario.email, usuario.senha],
        (err) => {
          if (err) {
            rej("Falha ao inserir usuário");
          } else {
            res("Usuário inserido com sucesso");
          }
        }
      );
    });
  }

  
  deletaUsuario(usuario) {
    return new Promise((res, rej) => {
      this.bd.run(
        "DELETE FROM USUARIOS WHERE EMAIL = (?)",
        [usuario],
        (err) => {
          if (err) {
            rej("Falha ao deletar usuário");
          } else {
            res("Usuário deletado com sucesso");
          }
        }
      );
    });
  }

  
  alteraUsuario(usuario, body) {
    return new Promise((res, rej) => {
      this.bd.run(
        "UPDATE USUARIOS SET NOME = (?), SENHA = (?) WHERE EMAIL = (?)",
        [body.NOME, body.SENHA, usuario],
        (err) => {
          if (err) {
            rej("Falha ao alterar usuário");
          } else {
            res("Usuário alterado com sucesso");
          }
        }
      )
    })
  }

  
};
