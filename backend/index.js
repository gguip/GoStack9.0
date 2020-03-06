const express = require("express");

const server = express();

server.use(express.json());

//Query Params = ?teste=GUilherme
server.get('/teste', (req, res) => {
  const nome = req.query.nome;

  return res.json({message: `Hello ${nome}`});
} )


const users = ['Guilherme', 'Fernanda', 'Eunice'];


//Midleware Global

server.use((req, res, next) => {
  console.time('Request');
  console.log('A requisição foi chamada!');

  next();

  console.timeEnd('Request');
})

//MiddleWare Local

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exist' });
  }

  req.user = user;

  return next();
}


//Route Params = /users/1
server.get('/users/:index', checkUserInArray, (req, res) => {

  return res.json(req.user);
})


server.get('/users', (req, res) => {
  return res.json(users);
})


server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
})


server.listen(3333);