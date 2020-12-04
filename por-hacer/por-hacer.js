const fs = require('fs');
const color = require('colors')

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: 'Sin Completar',
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
});

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let i = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (i >= 0) {
        listadoPorHacer[i].completado = completado;
        guardarDB();
        return "Tarea Actualizada";
    } else {
        return "Tarea no Actualizada";
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
}