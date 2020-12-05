const router = require('express').Router()

const { getAll, postCreate, getEjById } = require('../../models/ejercicio.js');


//todo OBTENER TODOS LOS EJERCICIOS

router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result);

    } catch (error) { res.json({ error: error.message }) }
})


//todo CREAR UN CLIENTE NUEVO

router.post('/', async (req, res) => {
    try {
        const result = await postCreate(req.body)
        const newEj = await getEjById(result.insertId)
        res.json(newEj)
    }
    catch {
        res.json({ error: error.message, mensaje: 'No se ha podido insertar' })
    }
})




module.exports = router;