const chalk = require('chalk');

function displayColorfulMessage() {
    console.log(chalk.blue.bold('This is a blue message!'));
    console.log(chalk.red.italic('This is a red italic message!'));
    console.log(chalk.green.inverse('This is a green inverted message!'));
    console.log(chalk.hex('#FFA500').bold('This is an orange message!'));
    console.log(chalk.rgb(128, 0, 128).underline('This is a purple underlined message!'));
}

module.exports = displayColorfulMessage;

