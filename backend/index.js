const express = require("express");

const server = express();

server.get('/teste', (req, res) => {
  return res.json({message: 'Hello world'});
} )

server.listen(3333);