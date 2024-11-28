const guardarDB = require("../helpers/guardarArchivo");
const Tarea = require("./crear");
const archivo2 = "./db/data.json";
const fs = require("fs").promises;
var colors = require("colors");

class Tareas {
  async listadoArr() {
    try {
      const data = await fs.readFile(archivo2, "utf8");
      const contenido = JSON.parse(data);
  
      // Imprimir encabezado similar al de usuarios
      console.log(
        `${"=".repeat(115)}\n` +
        `${"|".yellow}  ${"Id de Tarea".yellow.padEnd(46)} ${"|".yellow}  ${"Descripción".yellow.padEnd(48)} ${"|".yellow}  ${"Estado".yellow.padEnd(38)} ${"|".yellow}\n` +
        `${"=".repeat(115)}`
      );
  
      // Recorrer las tareas y mostrar la información
      contenido.tareas.forEach((tarea) => {
        let descripcion = tarea.desc.padEnd(38);  // Asegurar que la descripción tenga un tamaño fijo
        let estado = tarea.completadoEn.trim();  // Obtener el estado sin espacios adicionales
  
        // Cambiar el color según el estado
        if (estado === "Completada") {
          estado = estado.green.padEnd(38);  // Usar verde para completado
        } else if (estado === "Pendiente") {
          estado = estado.red.padEnd(38);  // Usar rojo para pendiente
        } else {
          estado = estado.yellow.padEnd(38); // Si el estado no es ninguno de los anteriores, usar amarillo por defecto
        }
  
        // Imprimir la tarea con el formato correspondiente
        console.log(
          `${"|".yellow}  ${tarea.id.toString().padEnd(18)} ${"|".yellow}  ${descripcion} ${"|".yellow}  ${estado} ${"|".yellow}`
        );
      });
  
      console.log(`${"=".repeat(115)}`);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }
  
  async listadoArrCompleto() {
    try {
      const data = await fs.readFile(archivo2, "utf8");
      const contenido = JSON.parse(data);
  
      // Imprimir encabezado similar al de listadoArr
      console.log(
        `${"=".repeat(115)}\n` +
        `${"|".yellow}  ${"Id de Tarea".yellow.padEnd(46)} ${"|".yellow}  ${"Descripción".yellow.padEnd(48)} ${"|".yellow}  ${"Estado".yellow.padEnd(38)} ${"|".yellow}\n` +
        `${"=".repeat(115)}`
      );
  
      // Recorrer las tareas y mostrar las completadas
      contenido.tareas.forEach((tarea) => {
        if (tarea.completadoEn === "Completada") {
          let descripcion = tarea.desc.padEnd(38);  // Asegurar que la descripción tenga un tamaño fijo
          let estado = tarea.completadoEn.trim();  // Obtener el estado sin espacios adicionales
  
          // Cambiar el color según el estado
          estado = estado.green.padEnd(38);  // Usar verde para completado
  
          // Imprimir la tarea con el formato correspondiente
          console.log(
            `${"|".yellow}  ${tarea.id.toString().padEnd(18)} ${"|".yellow}  ${descripcion} ${"|".yellow}  ${estado} ${"|".yellow}`
          );
        }
      });
  
      console.log(`${"=".repeat(115)}`);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }
  
  async listadoArrPendiente() {
    try {
      const data = await fs.readFile(archivo2, "utf8");
      const contenido = JSON.parse(data);
  
      // Imprimir encabezado similar al de listadoArr
      console.log(
        `${"=".repeat(115)}\n` +
        `${"|".yellow}  ${"Id de Tarea".yellow.padEnd(46)} ${"|".yellow}  ${"Descripción".yellow.padEnd(48)} ${"|".yellow}  ${"Estado".yellow.padEnd(38)} ${"|".yellow}\n` +
        `${"=".repeat(115)}`
      );
  
      // Recorrer las tareas y mostrar las pendientes
      contenido.tareas.forEach((tarea) => {
        if (tarea.completadoEn === "Pendiente") {
          let descripcion = tarea.desc.padEnd(38);  // Asegurar que la descripción tenga un tamaño fijo
          let estado = tarea.completadoEn.trim();  // Obtener el estado sin espacios adicionales
  
          // Cambiar el color según el estado
          estado = estado.red.padEnd(38);  // Usar rojo para pendiente
  
          // Imprimir la tarea con el formato correspondiente
          console.log(
            `${"|".yellow}  ${tarea.id.toString().padEnd(18)} ${"|".yellow}  ${descripcion} ${"|".yellow}  ${estado} ${"|".yellow}`
          );
        }
      });
  
      console.log(`${"=".repeat(115)}`);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }
  
  async completarTarea(id) {
    const data = await fs.readFile(archivo2, "utf8");

    const contenido = JSON.parse(data);

    const upDateEst = contenido.tareas.map((item) =>
      item.id === id ? { ...item, completadoEn: "Completada" } : item
    );
    
    const arrTarea = {
      tareas: upDateEst,
    };

    fs.writeFile(archivo2, JSON.stringify(arrTarea, null, 2), function (err) {
      if (err) throw err;
    });
  }

  crearTarea(data = "") {
    var text = "";
    const space = " ";
    const tarea = new Tarea(data);
    for (let i = 0; i < Math.ceil(tarea.desc.length / 20); i++) {
      if (tarea.desc.length <= 20) {
        text = `${tarea.desc.slice(i * 20, i * 20 + 20)}${space.repeat(
          (i + 1) * 20 - tarea.desc.length + 2
        )}|\n`;
      } else if (i === 0) {
        text = `${tarea.desc.slice(i * 20, i * 20 + 20)}  |\n`;
      } else if (i + 1 === Math.ceil(tarea.desc.length / 20)) {
        text = `${text}|                                       |                ${tarea.desc.slice(
          i * 20,
          i * 20 + 20
        )}${space.repeat((i + 1) * 20 - tarea.desc.length + 2)}|\n`;
      }
    }
    const plant = `|  ${tarea.id} |   Descripción: ${text}|                                       |   Estado: ${tarea.completadoEn}                  |\n--------------------------------------------------------------------------------\n`;
    if (tarea.desc.length > 0) {
      guardarDB(plant, tarea);
    }
  }
}
module.exports = Tareas;
