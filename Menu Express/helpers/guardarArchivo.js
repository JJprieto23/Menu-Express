const fs = require("fs");

const guardarDB = (data, data2) => {
  const archivo1 = "./db/data.txt";
  const archivo2 = "./db/data.json";
  const archivoCSV = "./db/data.csv";

  const st =
    "--------------------------------------------------------------------------------\n|                                       |                                      |\n|             Id de la tarea            |               Detalles               |\n|                                       |                                      |\n--------------------------------------------------------------------------------\n";
  const arrTarea = {
    tareas: [],
  };
  const csv = [
    ["id", "descripción","estado"]
  ]
  const csvInfo = [[`${data2.id}`, `${data2.desc}`, `${data2.completadoEn}`]];
  const convertirACSV = (datos) => {
    return datos.map((fila) => fila.join(","));
  }
  if (
    !fs.existsSync(archivo1) ||
    !fs.existsSync(archivo2) ||
    !fs.existsSync(archivoCSV)
  ) {
    try {
      const cvsData = `${convertirACSV(csv)}\n`;
      fs.writeFile(archivo1, st, (err) => {
        if (err) {
          console.error("Error al crear el archivo:", err);
        }
      });
      fs.writeFileSync(archivo2, JSON.stringify(arrTarea));
      fs.writeFileSync(archivoCSV, cvsData, "utf8");
    } catch (err) {
      console.error("Error al crear el archivo:", err);
    }
  }

  fs.readFile(archivo2, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    // Convertir el contenido del archivo JSON en un objeto JavaScript
    const contenido = JSON.parse(data);

    const rest = contenido.tareas.push(data2.toJSON());

    fs.writeFile(archivo2, JSON.stringify(contenido, null, 2), function (err) {
      if (err) throw err;
    });
  });

  fs.appendFile(archivo1, data, function (err) {
    if (err) throw err;
  });
const csvDataIn = `${convertirACSV(csvInfo)}\n`;
  fs.appendFile(archivoCSV, csvDataIn, function (err) {
    if (err) throw err;
  });
};

module.exports = guardarDB;
