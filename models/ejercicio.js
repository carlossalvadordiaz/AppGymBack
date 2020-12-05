// Recuperar todos los ejercicios

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from ejercicios', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


//Crear nuevo ejercicio

const postCreate = ({
    titulo,
    duracion,
    repeticiones
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into ejercicios (titulo, duracion, repeticiones) values(?, ?, ?)',
            [titulo, duracion, repeticiones],
            (error, result) => {
                if (error) reject(error);
                resolve(result)

            });
    });
}


const getEjById = (ejercicioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from ejercicios WHERE id = ?', [ejercicioId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getEjByClienteId = (idCliente) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select ejer.* from tbi_clientes_ejercicios as tbi, ejercicios as ejer where tbi.fk_cliente = ? and tbi.fk_ejercicio = ejer.id',
            [idCliente],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    })
}

module.exports = {
    getAll, postCreate, getEjById, getEjByClienteId
}