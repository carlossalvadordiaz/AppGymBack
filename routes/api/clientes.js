const router = require('express').Router();
const { getAll, create, getClientById, updateClientById, deleteClientById } = require('../../models/cliente')
const { getEjByClienteId } = require('../../models/ejercicio')
const { body, validationResult } = require('express-validator')

router.get('/', async (req, res) => {

    //Valor del usuario que ha hecho login
    console.log(req.user);
    try {
        const rows = await getAll();
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message });

    }
});

//Sacar los ejercicios del cliente
router.get('/:idCliente/ejercicios', (req, res) => {
    //Recuperar el cliente -getClientById (models/cliente.js)

    getClientById(req.params.idCliente)
        .then((cliente) => {
            if (cliente) {
                getEjByClienteId(cliente.id)
                    .then((result) => {

                        cliente.ejercicios = result
                        res.json(cliente)
                    })
                    .catch((error) => {
                        res.json({ error: error.message })
                    })
            } else {
                res.json({ error: 'El cliente no existe' })
            }
        })
        .catch((error) => { res.json({ error: error.message }) })
    //Recuperar los ejercicios de un cliente - getEjByClienteId(models/ejercicio.js)
})
//Crea un nuevo cliente
router.post('/', [
    //Validadores del body
    body('nombre').exists().not().isEmpty(),
    body('email').isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const result = await create(req.body)


    if (result.affectedRows === 1) {
        const nuevoCliente = await getClientById(result.insertId);
        res.json(nuevoCliente)
        //cliente insertado
    } else {
        //Cliente NO insertado
        res.json({ error: 'an error has appeared' })
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await updateClientById(req.body.idCliente, req.body)
        if (result.affectedRows === 1) {
            const updatedClient = await getClientById(req.body.idCliente);
            res.json({
                mensaje: "Cliente actualizado",
                cliente: updatedClient
            });
        } else {
            res.json({ error: 'No se ha podido actualizar' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})


router.delete('/:idCliente', async (req, res) => {
    try {
        const result = await deleteClientById(req.params.idCliente);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'Se ha borrado correctamente' });
        } else {
            res.json({ error: 'Ha ocurrido un error' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
})

module.exports = router