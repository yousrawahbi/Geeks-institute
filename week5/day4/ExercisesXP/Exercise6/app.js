const chalk = require('chalk');

console.log(chalk.blue('This is a blue message!'));
console.log(chalk.red.bold('This is bold red text!'));
console.log(chalk.green.underline('This is underlined green text!'));
console.log(chalk.yellow.bgBlue('This is yellow text on blue background!'));

console.log('\n' + chalk.hex('#FF5733').bold('Welcome to Node.js!'));
console.log(chalk.rgb(255, 105, 180)('This is hot pink!'));
console.log(chalk.bgHex('#FFC300').black('Orange background with black text!'));

console.log('\n' + chalk.red('❌ Error: Something went wrong!'));
console.log(chalk.yellow('⚠️  Warning: Proceed with caution!'));