const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    tel: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    pass: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }

});

UserSchema.method('toJSON', function() {
    const { __v, _id, pass, ...object } = this.toObject();
    object.unique_id = _id;
    return object;
})

module.exports = model('User', UserSchema);