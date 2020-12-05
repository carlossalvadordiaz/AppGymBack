### RUTAS

get/clientes => Muestra una vista con todos los clientes
get/clientes/clienteId => muestra una vista con los datos de un unico cliente

get/clientes/nuevo => Muestra una vista con el formulario para insertar un cliente 
POST clientes/create => Recibe los datos del formulario anterior y redirige a /clientes

GET /clientes/edita/idCliente => Muestra una vista con el formulario para editar un cliente 
POST /clientes/update => Recibe los datos del formulario anterior y redirige a /clientes

GET /clientes/borrar/idCliente => borra los datos del cliente especificado