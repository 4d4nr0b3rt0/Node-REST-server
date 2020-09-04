// PORT

process.env.PORT = process.env.PORT || 3000;


// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de Datos

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cafe';
} else {
    urlDB = 'mongodb+srv://fibcer_adan:ynvZom3NRWecZR2Q@cluster0.d3mdo.mongodb.net/test';
}

process.env.localURL = urlDB;