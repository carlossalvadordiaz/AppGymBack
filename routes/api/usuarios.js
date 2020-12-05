const router = require('express').Router()
const { createUser, getUserByEmail } = require('../../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

router.post('/registro', async (req, res) => {
    try {
        //puedes bloquear aqui que haya 2 emails iguales o en la db en usuarios

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await createUser(req.body);
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body; //ya tengo dos variables
    try {
        const user = await getUserByEmail(email);
        if (!user)
            //Si no existe ese email con el user, muestro error
            return res.json({ error: 'Usuario y/o password invalidos' })


        //Comprobamos que la pass coincide
        const iguales = bcrypt.compareSync(password, user.password)
        if (!iguales) return res.json({ error: 'Usuario y/o password invalidos' })

        console.log(createToken(user));

        res.json({
            success: 'Correct Login!',
            token: createToken(user)
        })

    } catch (error) {
        res.json({ error: error.message })
    }

    function createToken(user) {

        const obj = {

            userId: user.id,
            caducidad: dayjs().add(10, 'day').unix()
        }
        return jwt.sign(obj, process.env.SECRET_KEY);


    }


});





module.exports = router;
