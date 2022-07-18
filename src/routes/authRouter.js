// authRouter.js
// Express
const express = require('express');
// Enrutador
const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
});


// Exportar Modulo Router
module.exports = router;
