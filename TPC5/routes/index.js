var axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/filmes', async function(req, res, next) {
  try {
    const response = await axios.get("http://localhost:3000/filmes");
    const sorted = response.data.sort((a, b) => a.title.localeCompare(b.title));
    res.render('filmes', { list: response.data });
  } catch (error) {
    next(error);
  }
});

router.get('/filmes/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const responseFilme = await axios.get(`http://localhost:3000/filmes/${id}`);
    const atoresFilme = await axios.get(`http://localhost:3000/atores?filmes_like=${id}`);
    const generosFilme = await axios.get(`http://localhost:3000/generos?filmes_like=${id}`);
    res.render('pagFilme', { filme: responseFilme.data, elenco: atoresFilme.data, generos: generosFilme.data});
  } catch (error) {
    next(error);
  }
});

router.get('/atores', async function(req, res, next) {
  try {
    const response = await axios.get("http://localhost:3000/atores");
    const sorted = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
    res.render('atores', { list: response.data });
  } catch (error) {
    next(error);
  }
});


router.get('/atores/:id', async function(req, res, next) {
  try {
    const response = await axios.get(`http://localhost:3000/atores/${req.params.id}`);
    const ator = response.data;

    const filmes = [];
    for (const fid of ator.filmes) {
      const filmeResponse = await axios.get(`http://localhost:3000/filmes/${fid}`);
      filmes.push(filmeResponse.data);
    }
    ator.filmes = filmes;

    res.render('pagAtor', { ator });
  } catch (error) {
    next(error);
  }
});


router.get('/generos', async function(req, res, next) {
  try {
    const response = await axios.get("http://localhost:3000/generos");
    const sorted = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
    res.render('generos', { list: response.data });
  } catch (error) {
    next(error);
  }
});


router.get('/generos/:id', async function(req, res, next) {
  try {
    const response = await axios.get(`http://localhost:3000/generos/${req.params.id}`);
    const genero = response.data;

    const filmes = [];
    for (const fid of genero.filmes) {
      const filmeResponse = await axios.get(`http://localhost:3000/filmes/${fid}`);
      filmes.push(filmeResponse.data);
    }
    genero.filmes = filmes;

    res.render('pagGenero', { genero });
  } catch (error) {
    next(error);
  }
});

module.exports = router;