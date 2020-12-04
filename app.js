const argv = require('./config/yargs').argv;
const color = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('==============Por Hacer============'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado.red);
            console.log('==================================='.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let eliminar = porHacer.borrar(argv.descripcion);
        console.log(eliminar);
        break;
    default:
        console.log("Comando no definido".red);
        break;
}