const  { v4 : uuidv4 } = require('uuid')
class Tarea {
  id = "";
  desc = "";
  completadoEn = "Pendiente";

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = "Pendiente";
  }

  toJSON() {
    return {
      id: this.id,
      desc: this.desc,
      completadoEn: this.completadoEn,
    };
  }
}

module.exports = Tarea;
