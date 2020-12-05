const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getUserById } = require('../models/usuario.js');

const checkToken = async (req, res, next) => {

    if (process.env.MIDDLEWARE_ACTIVATE === 'OFF') {
        return next()
    }
    //Poner el token asociado a la peticion (headers)
    if (!req.headers['authorization']) {
        return res.status(403).json({ error: 'Necesitas la cabecera Authorization' });
    }
    // Si no viene en las cabeceras => error , comprobar si es correcto
    const token = req.headers['authorization'];
    //obj => usuarioId, caducidad, iat
    const obj = jwt.decode(token, process.env.SECRET_KEY);
    if (!obj) {
        return res.status(403).json({ error: 'El token es incorrecto' })
    }
    //Comprobar si ha caducado
    if (dayjs().unix() > obj.caducidad) {
        return res.status(403).json({ error: 'Token caducado, pide otro' })
    }

    //Comprobar si el usuario existe
    const userExist = await getUserById(obj.userId);
    if (!userExist) { return res.status(403).json({ error: 'El usuario no existe' }) }

    req.user = userExist;

    next();
}


const adminRole = (req, res, next) => {

    if (process.env.MIDDLEWARE_ACTIVATE === 'OFF') {
        return next()
    }
    if (req.user.role !== 'ADMIN') {
        res.status(403).json({ error: 'debes tener permisos de administracion' })
    }
    next()
}

module.exports = {
    checkToken, adminRole
}