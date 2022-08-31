// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
const sError = {
  error: "No se recibieron los parámetros necesarios para crear el Post",
};

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
server.get("/", function (req, res) {
  //Ruta para un GET a /
  res.send("Hola mundo!"); // response "Hola mundo!" en la pagina principal
});

server.get("/posts", function (req, res) {
  //Ruta para un GET a /
  let terms = req.query.term;
  if (terms) {
    let filtrados = posts.filter(
      (el) => el.title.includes(terms) || el.contents.includes(terms)
    );
    res.status(200).json(filtrados);
  } else res.status(200).json(posts);
});
// TODO: your code to handle requests

server.get("/posts/:author", function (req, res) {
  //Ruta para un GET a /
  let terms = req.params.author;
  let filtrados = posts.filter((el) => el.author === terms);
  if (filtrados.length < 1) res.status(STATUS_USER_ERROR).json(sError);
  else res.status(200).json(filtrados);
});
server.get("/posts/:author/:title", function (req, res) {
  //Ruta para un GET a /
  let autor = req.params.author;
  let titulo = req.params.title;
  let filtrados = posts.filter(
    (el) => el.author === autor && el.title === titulo
  );
  if (filtrados.length < 1)
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  else res.status(200).json(filtrados);
});

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;

  if (!author || !title || !contents)
    res.status(STATUS_USER_ERROR).json(sError);
  else {
    let post = {
      ...req.body,
      id: posts.length + 1,
    };
    posts.push(post);
    res.status(200).json(post);
  }
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) res.status(STATUS_USER_ERROR).json(sError);
  else {
    let post = {
      author: req.params.author,
      ...req.body,
      id: posts.length + 1,
    };
    posts.push(post);
    res.status(200).json(post);
  }
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  } else {
    let filtrados = posts.filter((el) => el.id === req.body.id);
    if (id && filtrados < 1) {
      res.status(STATUS_USER_ERROR).json({
        error: "No se encontro elemento ",
      });
    }else{
        posts.forEach((el=>{
            if(el.id=== id){
                el.title= title
                el.contents= contents
                res.status(200).json(el)
            }
        }) )
    }
  }
});

server.delete("/posts", (req,res)=>{
    const { id } = req.body;
    if(!id) res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
    else {
        let filtrado= posts.filter((el)=> el.id=== id)
        if(filtrado.length<1)res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
        else{
            posts= posts.filter((el)=> el.id!==id)
            res.status(200).json({ success: true })
        }
    }
})
server.delete("/author", (req,res)=>{
    const {author } = req.body;
    if(!author) res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
    else{
        let filtrado= posts.filter((el)=> el.author=== author)
        if(filtrado.length<1)res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
        else{
            posts= posts.filter((el)=> el.author!==author)
            res.status(200).json(filtrado)
        }

    }
})

module.exports = {
  posts,
  server,
};
