//TODAS LAS ACCIONES SOBRE LA TABLA DE CLIENTES

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });

};
//aislo el getAll y lo recojo donde lo quiera utilizar


// 1 - Qué datos recibe el método
// 2 - sentencia SQL
//3 - que devuelve la query y gestionarla
//4 exportar la funcion
const create = ({
    nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni
}) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO clientes (nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, fecha_inscripcion) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, new Date()], (error, result) => {
            if (error) reject(error);
            resolve(result);

        });

    })
}

const getClientById = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes where id = ?', [pClienteId], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]); //Siempre va a devolver un ARRAY aunque solo sea de un objeto
        })

    })
}
//El delete devuelve un objeto
const deleteClientById = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from clientes where clientes.id = ?', [pClienteId], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })

    })
}


const updateClientById = (pClienteId, {
    nombre, apellidos, direccion, email, edad, cuota, dni
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update clientes set nombre = ?, apellidos = ?, direccion= ?, email= ?, edad= ?, cuota= ?, dni= ? where id = ?',
            [nombre, apellidos, direccion, email, edad, cuota, dni, pClienteId],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
    })
}


module.exports = {
    getAll, create, getClientById, deleteClientById, updateClientById
}