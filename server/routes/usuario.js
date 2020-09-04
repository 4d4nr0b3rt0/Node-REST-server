const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcript = require('bcrypt');
const _ = require('underscore');





// GET- ruta/ mostrar usuarios

app.get('/usuario', (req, res) => {
    let registro = req.query.registro || 0;
    registro = Number(registro);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({}, 'nombre email estado role img google')
        .skip(registro)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    registros: conteo
                });
            });


        })
});



//POST- ruta/ crear usuario

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcript.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});



//PUT- ruta/ actualizar usuario

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        })
});



//DELETE- ruta/ borrar usuario

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false,
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });

            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        }
    });

});





module.exports = app;