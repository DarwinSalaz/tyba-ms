const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersPost = async(req, res = response) => {

    try {
        const { name, lastname, email, password, role } = req.body;
        const user = new User({ name, lastname, email, password, role });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );

        // Guardar en BD
        await user.save();

        res.json({
            user
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error al registrar el usuario - usuario ya existe'
        })
    }
    

}

module.exports = {
    usersPost,
}