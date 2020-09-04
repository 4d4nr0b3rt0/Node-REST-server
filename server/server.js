require('../config/config');



const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bp = require('body-parser');




app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use(require('./routes/usuario'));


mongoose.connect(process.env.localURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})



.then(db => console.log('Base de datos Conectada ON LINE'))
    .catch(err => console.log(err));




app.listen(process.env.PORT, () => {
    console.log('Server on port 3000');
});