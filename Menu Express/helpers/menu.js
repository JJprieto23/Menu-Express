// import colors from 'colors';
var colors = require("colors");
const inquirer = require("inquirer");
const { validate } = require("uuid");

const preg = [
  {
    type: "list",
    name: "options",
    message: "Escoje la opción de tu preferencia.",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listars tareas completas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listars tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tareas`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const menu = async () => {
  console.clear();
  console.log(
    `${"=".repeat(115)}\n` +
    `${"    Gestionar Tareas    ".magenta} \n` +
    `${"=".repeat(115)}`
  );

  const { options } = await inquirer.default.prompt(preg);
  return options;
};

const pause = async () => {
  const questions = [
    {
      type: "input",
      name: "enter",
      message: `Presione la tecla ${"enter".green}`,
    },
  ];
  console.log('\n')
  await inquirer.default.prompt(questions);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.lenght === 0) {
          return "Por favor ingrese una descripción";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.default.prompt(question);
  return desc;
};

module.exports = {
  menu,
  pause,
  leerInput,
};
