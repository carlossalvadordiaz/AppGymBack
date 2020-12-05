const createUser = ({
    username, email, password
}) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (username, email, password, role, fecha_registro) values (?, ?, ?, ?, ?)',
            [username, email, password, 'NONE', new Date()],
            (err, result) => {
                if (err) reject(err)
                resolve(result);
            })

    })

}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from usuarios where email = ?',
            [email],
            (err, result) => {
                if (err) reject(err);
                if (result.length !== 1) resolve(null); //si devuelve <1 hay mas registrados con el mismo usuario
                resolve(result[0]);
            })
    })

}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from usuarios where id = ?', [id], (err, result) => { if (err) reject(err); if (result.length !== 1) resolve(null); resolve(result[0]) });
    })
}



module.exports = {
    createUser, getUserByEmail, getUserById
}