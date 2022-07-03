const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersPost = async(req, res = response) => {

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

}

module.exports = {
    usersPost,
}