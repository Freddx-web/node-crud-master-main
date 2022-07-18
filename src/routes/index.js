// Express
const express = require('express');
// Enrutador
const router = express.Router();

/* Ogtener pag principal  - GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Exportar Modulo Router
module.exports = router;
