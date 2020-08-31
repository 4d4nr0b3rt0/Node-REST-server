require('../config/config');

const express = require('express');
const app = express();
const bp = require('body-parser');


app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());


app.get('/usuario', (req, res) => {
    res.json('Get de usuario');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es obligatorio'
        })
    } else {
        res.json({
            Usuario: body
        })
    }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id: id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('Delet Usuario');
});



app.listen(process.env.PORT, () => {
    console.log('Server on port 3000');
});