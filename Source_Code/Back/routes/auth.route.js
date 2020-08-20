/*
    Path: '/api/login'
*/

//Imports
const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validate');

const router = Router();

router.post('/', [
        check('email', 'El email es requerido').isEmail(),
        check('pass', 'La contraseña es requerida').not().isEmpty(),
        validateForm
    ],
    login
)

module.exports = router;