//Imports
const { response } = require("express");
const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {
    const { email, pass } = req.body;
    try {
        //Check mail
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //Check pass
        const validPass = bcrypt.compareSync(pass, userDB.pass);

        if (!validPass) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }
        //Generate TOKEN - JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Pongase en contacto con el administrador'
        });
    }
}

//Renew Token
const renewToken = async(req, res = response) => {

    const uid = req.uid;
    //Generate TOKEN - JWT
    const token = await generateJWT(uid);

    //Get  users data
    const user = await User.findById(uid);
    res.json({
        ok: true,
        token,
        user
    })
}

module.exports = {
    login,
    renewToken
};