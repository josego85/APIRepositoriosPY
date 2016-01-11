var express = require('express');
var app = express();
var mysql = require('mysql');
var connectionpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'repositoriosPY'
});

app.listen(3000);
console.log('API RepositoriosPY escucha en el puerto 3000');

app.get('/:personas', function(req,res){
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('Error en la coneccion: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {
            connection.query('SELECT p.persona_id as persona_id, p.persona_nombres' +
              ' as nombres, p.persona_apellidos' +
              ' as apellidos FROM personas p', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err: err.code
                    });
                }
                res.send({
                    result: 'success',
                    err: '',
                    json: rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
});

app.get('/:personas/:persona_id', function(req,res){
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('Error en la coneccion: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {
            connection.query('SELECT r.repositorio_link as repositorio FROM repositorios r ' +
              ' WHERE r.persona_id=' +
              req.params.persona_id, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err: err.code
                    });
                }
                res.send({
                    result: 'success',
                    err: '',
                    json: rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
});

// Routes.
app.get('/:personas/', function(req, res){});
app.get('/:personas/:persona_id', function(req, res){});
