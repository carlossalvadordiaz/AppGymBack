
const router = require('express').Router();

const { checkToken, adminRole } = require('./middlewares');


const apiClientesRouter = require('./api/clientes')

const apiEjercicioRouter = require('./api/ejercicios')

const apiUsuariosRouter = require('./api/usuarios')


router.use('/clientes', checkToken, adminRole, apiClientesRouter) //middleware colocado

router.use('/ejercicios', apiEjercicioRouter)

router.use('/usuarios', apiUsuariosRouter)




module.exports = router;
