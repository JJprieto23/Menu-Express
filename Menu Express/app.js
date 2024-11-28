const { menu, pause, leerInput} = require('./helpers/menu')
const Tareas = require('./models/listar')
const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    do{
        opt = await menu();
        switch (opt) {
            case '1':
                const desc = await leerInput("Descripcion: ");
                tareas.crearTarea(desc);
                 break;
            case '2':
                await tareas.listadoArr();
                break;
            case '3':
                await tareas.listadoArrCompleto();
                break;
            case '4':
                await tareas.listadoArrPendiente();
                break;
            case '5':
                const id = await leerInput("Ingrese el id de la tarea completada: ");
                await tareas.completarTarea(id)
                break; 
            default:
                break;
        }
        await pause();
    } while ( opt !== '0');
} 

main()