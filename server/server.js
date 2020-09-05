// Requires

require('../config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bp = require('body-parser');
const path = require('path');





// middlewares

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }));

// parse application/json
app.use(bp.json());

// Archivo publico
app.use(express.static(path.resolve(__dirname, '../public')));






// Rutas global

app.use(require('./routes/index'));





// Conexion DB

mongoose.connect(process.env.localURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(db => console.log('Base de datos Conectada ON LINE'))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('Server on port:', process.env.PORT);
});