/*
    Path: '/api/users'
*/

//Imports
const { Router } = require('express');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validate');
const { getUsers, createUsers, updateUsers, deleteUser } = require('../controllers/users.controller');
const { validateJWT } = require('../middlewares/validateJWT');



const router = Router();

router.get('/',
    validateJWT,
    getUsers
);

router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('apellido', 'El apellido es requerido').not().isEmpty(),
        check('tel', 'El télefono es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('pass', 'La contraseña es requerida').not().isEmpty(),
        validateForm
    ],
    createUsers
);

router.put('/:id', [
        validateJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('apellido', 'El apellido es requerido').not().isEmpty(),
        check('tel', 'El télefono es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('role', 'El role es requerido').not().isEmpty(),
        validateForm
    ],
    updateUsers
);
router.delete('/:id',
    validateJWT,
    deleteUser
);
module.exports = router;