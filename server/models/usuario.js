const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} No es un rol valido '
};


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Campo obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Campo obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Campo obligatorio']
    },
    img: {
        type: String,
        default: false
    },
    role: {
        type: String,
        default: 'USER',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.method.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico ' });

module.exports = mongoose.model('Usuario', usuarioSchema);