module.exports = class TarefaDao {
  constructor(bd) {
    this.bd = bd;
  }

  listaTarefas() {
    return new Promise((res, rej) => {
      this.bd.all("SELECT * FROM TAREFAS", (err, tarefas) => {
        if (err) {
          rej(err);
        } else {
          res(tarefas);
        }
      });
    });
  }

  listaTituloPorTarefas(titulo) {
    return new Promise((res, rej) => {
      this.bd.all(
        "SELECT * FROM TAREFAS WHERE TITULO = (?)",
        [titulo],
        (err, titulo) => {
          if (err) {
            rej(err);
          } else {
            res(titulo);
          }
        }
      );
    });
  }

  insereTarefa(tarefa) {
    return new Promise((res, rej) => {
      this.bd.run(
        "INSERT INTO TAREFAS (TITULO, DESCRICAO, STATUS, DATACRIACAO, ID_USUARIO) VALUES (?,?,?,?,?)",
        [
          tarefa.titulo,
          tarefa.descricao,
          tarefa.status,
          tarefa.datacriacao,
          tarefa.id_usuario,
        ],
        (err) => {
          if (err) {
            rej("Falha ao inserir tarefa");
          } else {
            res("Tarefa inserida com sucesso");
          }
        }
      );
    });
  }

  deletaTarefa(titulo) {
    return new Promise((res, rej) => {
      this.bd.run("DELETE FROM TAREFAS WHERE TITULO = (?)", [titulo], (err) => {
        if (err) {
          rej("Falha ao deletar tarefa");
        } else {
          res("tarefa deletada com sucesso");
        }
      });
    });
  }

  alteraTarefa(titulo, body) {
    return new Promise((res, rej) => {
      this.bd.run(
        "UPDATE TAREFAS SET STATUS = (?), DESCRICAO = (?) WHERE TITULO = (?)",
        [body.STATUS, body.DESCRICAO, titulo],
        (err) => {
          if (err) {
            rej("Falha ao alterar tarefa");
          } else {
            res("Tarefa alterado com sucesso");
          }
        }
      );
    });
  }
};
