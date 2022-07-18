
// Importamos paquete
const bcrypt = require("bcryptjs");
// Conexion
const conexion = require("../database/conexion");

// Exportacion de las funciones Modelos de la Tabla
module.exports = {

    // Funcion para Insertar los datos
    insertar(nombre, email, password) {
        return new Promise((resolve, reject) => {
            const RoundSalt = 10;
            bcrypt.hash(password, RoundSalt, (err, encriptacion) =>{
                if (err) { console.log('Error hasheando:', err);}
                else {
                    conexion.query(`insert into usuarios (nombre, email, password) values (?, ?, ?)`,
                    [nombre, email, encriptacion], (err, resultados) => {
                        if (err) reject(err);
                        else resolve(resultados.insertId);
                    });
                }
            })
        });
    },
    // Funcion para obtener los datos
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, password from usuarios`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    // Funcion para indentificar los datos
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, password from usuarios where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    // Funcion para actualizar los datos
    actualizar(id, nombre, email, password) {
        return new Promise((resolve, reject) => {
            const RoundSalt = 10;
            bcrypt.hash(password, RoundSalt, (err, encriptacion) =>{
                if (err) { console.log('Error hasheando:', err);}
                else {
                    conexion.query(`update usuarios set 
                         nombre = ?, 
                         email = ?, 
                         password = ? 
                         where id = ?`,
                    [nombre, email, encriptacion, id],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                }
            })
        });
    },
    // Funcion para eliminar los datos
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from usuarios
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}