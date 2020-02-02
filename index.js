//npm install --save express
//npm install --save ejs
//npm install --save body-parser
//npm install --save sequelize
//npm install --save mysql2
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o Banco de Dado");
  })
  .catch(msgErro => {
    console.log("Erro ao Conectar com o Banco de Dado" + msgErro);
  });

//Estou dizendo para o Express usar o EJS com View Enine
app.set("view engine", "ejs");
app.use(express.static("public"));
//Body Parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//
//Rotas
app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"] //ASC = Crescente || DESC = Decrescente
    ]
  }).then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  const id = req.params.id;

  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) {
      // Pergunta encontrada
      Resposta.findAll({
        where: {
          perguntaId: pergunta.id
        },
        order: [
          ["id", "DESC"] //ASC = Crescente || DESC = Decrescente
        ]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    } else {
      // Não encontrada
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  const corpo = req.body.corpo;
  const perguntaId = req.body.pergunta;

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  });
});

//Porta
app.listen(3000, () => {
  console.log("App Rodando!");
});
