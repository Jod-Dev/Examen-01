/*
    Path: '/api/login'
*/

//Imports
const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validate');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post('/', [
        check('email', 'El email es requerido').isEmail(),
        check('pass', 'La contraseña es requerida').not().isEmpty(),
        validateForm
    ],
    login
)

router.get('/renew',
    validateJWT,
    renewToken
)
module.exports = router;