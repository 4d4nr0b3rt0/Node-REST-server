// PORT

process.env.PORT = process.env.PORT || 3000;


// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//Token-vencimiento: 60 seg * 60 min * 24 hrs * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// SEED Token
process.env.SEMILLA = process.env.SEMILLA || 'semilla-del-token';

//Base de Datos

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.localURL = urlDB;