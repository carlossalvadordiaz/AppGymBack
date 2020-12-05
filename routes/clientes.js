var express = require('express');
const dbConfig = require('../dbConfig');
var router = express.Router();
const { getAll, create, getClientById, deleteClientById, updateClientById } = require('../models/cliente.js') //recojo los datos del modelo => DESTRUCTURING

/* GET clientes page. */

//localhost:3000/clientes
router.get('/', ((req, res) => {

    getAll()
        .then(rows => {
            res.render('clientes/index', { clientes: rows })
        })
        .catch(error => { console.log(error); });

}));


//localhost:3000/clientes/nuevo
router.get('/nuevo', ((req, res) => {
    res.render('clientes/formNew')
}))

//localhost:3000/clientes/update/idCliente

router.get('/edita/:idCliente', async (req, res) => {
    //Recuperar el id del cliente de la url

    const idCliente = req.params.idCliente;

    //Recuperar de la db el cliente a editar

    const cliente = await getClientById(idCliente);
    //Renderizar la vista pasándole el cliente

    res.render('clientes/formEdit', { cliente });

})

router.get('/borrar/:idCliente', async (req, res) => {
    //Recuperar el id del cliente de la url
    const idCliente = req.params.idCliente;
    //Borrar el cliente de la base de datos
    deleteClientById(idCliente)
        .then((cliente => {
            res.render('clientes/delete', { cliente })
        }))
        .catch((error) => console.log(error));

    // const result = await deleteById(idCliente);
    res.redirect('/clientes')
}


    //Redirigir a la lista de clientes
)

//.../clientes/231
router.get('/:idCliente', (req, res) => {
    const idCliente = req.params.idCliente;
    //Recuperar el cliente de la db
    getClientById(idCliente)
        .then((cliente) => {
            // res.json(cliente) //para probar
            res.render('clientes/show', { cliente });
        })
        .catch((error) => console.log(error));


    //renderizar la vista con el cliente recuperado
})


//localhost:3000/clientes/create

router.post('/create', async (req, res) => {
    console.log(req.body);
    const result = await create(req.body);
    console.log(result);
    res.redirect('/clientes')
})
//localhost:3000/clientes/update/:clienteId

router.post('/update', async (req, res) => {
    //Body de la pet post
    const cliente = req.body;

    //Update sobre la db
    const result = await updateClientById(cliente.clienteId, cliente); //Le pasas cliente.clienteId porque es el name del input del FORMULARIO
    console.log(result);

    // redireccion al cliente editado

    res.redirect('/clientes/' + cliente.clienteId);
})


module.exports = router;
