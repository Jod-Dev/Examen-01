/*
 */
//Imports
const { response } = require('express');
const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

//Get Users
const getUsers = async(req, res) => {

    const users = await User.find({}, 'nombre apellido tel email');

    res.json({
        ok: true,
        users,
        uid: req.uid
    });
}

//Create Users
const createUsers = async(req, res = response) => {

    const { email, pass } = req.body;


    try {
        //Validate Unique email
        const DuplicateEmail = await User.findOne({ email });

        if (DuplicateEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is already registered'
            });
        }

        // Instance
        const user = new User(req.body)

        //Encrypt Save oneway Hash
        const salt = bcrypt.genSaltSync();
        user.pass = bcrypt.hashSync(pass, salt);

        //Save User
        await user.save();

        //Generate TOKEN - JWT
        const token = await generateJWT(user.id);

        //Response
        res.json({
            ok: true,
            user,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperaado'
        });
    }
}

//Update Users
const updateUsers = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== email) {

            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            usuario: userUpdated
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

//Delete Users
const deleteUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await User.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUser
};