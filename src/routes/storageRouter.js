// authRouter.js
// Express
const express = require('express');
// Enrutador
const router = express.Router();

router.get('/storage', function(req, res, next) {
  res.render('store/storage', { 
    title: 'storage',
    subtitle1: 'JSON data API:',
    subtitle2: 'MongoDB database data:'
  });
});

// Exportar Modulo Router
module.exports = router;
