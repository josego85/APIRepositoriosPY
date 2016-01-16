// Inicializacion.
var express = require('express');               // Utilizamos express.
var app = express();
var puerto = process.env.PORT || 5300; 			// Puerto 5300.
var router = express.Router();

// Escucha en el puerto 5300 y corre el server.
app.listen(puerto, function() {
    console.log('API RepositoriosPY escucha en el puerto ' + puerto);
});

// Routes.
app.use('/', router);
router.get('/personas', require('./routes/personas'));
router.get('/personas/:persona_id', require('./routes/personas'));
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');       // Carga única de la vista.
});
