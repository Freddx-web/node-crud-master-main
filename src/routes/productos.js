// Express
const express = require('express');
// Enrutador
const router = express.Router();
// Exportar Modelo tabla Producto
const productosModel = require("../models/productos");


//============================================================//
//                Enrutar Pag(Ver/Producto)                   //
//============================================================//
router.get('/', function (req, res, next) {

    // Se asignar el modelo(productosModel)
    productosModel
        // Funcion para obtener los datos
        .obtener()
        .then(productos => {
            //Renderizar pag(productos/ver)
            res.status(202).render("productos/ver", {
                productos: productos,
            });
        })
        //En caso si falla
        .catch(err => {
            return res.status(500).send("Error obteniendo productos");
        });

});
//============================================================//
//                Enrutar Pag(Agregar)                        //
//============================================================//
router.get('/agregar', function (req, res, next) {
    res.status(202).render("productos/agregar");
});

//============================================================//
//                 Enrutar Pag(Insertar)                      //
//============================================================//
router.post('/insertar', function (req, res, next) {

    /* 
    *  Obtener el nombre y precio. Es lo mismo que
    *  const nombre = req.body.nombre;(Formulario)
    *  const precio = req.body.precio;(Formulario)
    */

    // Capturar datos
    const { nombre, precio } = req.body;

    // validar Campos
    if (!nombre || !precio) {
        return res.status(404).send("No hay nombre o precio");
    }
    // Si todo va bien, seguimos


    // Se asignar el modelo(productosModel)
    productosModel
        .insertar(nombre, precio)
        .then(idProductoInsertado => {
            res.status(202).redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error insertando producto");
        });
});
//============================================================//
//                Enrutar Pag(eliminar)                       //
//============================================================// 
router.get('/eliminar/:id', function (req, res, next) {

    //Se asignar el modelo(productosModel)
    productosModel
        .eliminar(req.params.id)
        .then(() => {
            res.status(202).redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error: eliminando de datos");
        });
});
//============================================================//
//                Enrutar Pag(Editar)                         //
//============================================================// 
router.get('/editar/:id', function (req, res, next) {
    productosModel
        .obtenerPorId(req.params.id)
        .then(producto => {
            if (producto) {
                res.status(202).render("productos/editar", {
                    producto: producto,
                });
            } else {
                return res.status(404).send("No existe producto con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo producto");
        });
});
//============================================================//
//                Enrutar Pag(Acualizar)                      //
//============================================================// 
router.post('/actualizar/', function (req, res, next) {
    /* 
    *  Actualizar el nombre y precio. Es lo mismo que
    *  const nombre = req.body.nombre;(Formulario)
    *  const precio = req.body.precio;(Formulario)
    */
    const { id, nombre, precio } = req.body;
    if (!nombre || !precio || !id) {
        return res.status(404).send("No hay suficientes datos");
    }
    // Si todo va bien, seguimos

    // Se asignar el modelo(productosModel)
    productosModel
        .actualizar(id, nombre, precio)
        .then(() => {
            res.status(202).redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});


// Exportacion Global
module.exports = router;
