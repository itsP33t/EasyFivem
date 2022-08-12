#!/usr/bin/env node

// variables
import packageJson from './package.json' assert {type: 'json'};
const version = packageJson.version
let qnt;
const ScriptLocation = path.dirname(process.argv[1]);

// imports
import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk';
import updateNotifier from 'update-notifier';
import cliSelect from 'cli-select'
import inquirer from 'inquirer'


// generate random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Start
updateNotifier({pkg: packageJson}).notify();
console.log(`
${chalk.gray('------------------------------------------------------')}  
- ${chalk.green('Easy')}${chalk.red('Fivem')} 🐌 
- Current version: ${chalk.yellow(version)}
- ${chalk.red('[!]')} ${chalk.bold.white('Please note that this version isn\'t fully tested, but it should work!')}       
${chalk.green('Now you can import your own projects, just import the folder to')} ${chalk.gray(`${ScriptLocation}/addon`)}
${chalk.gray('------------------------------------------------------')}
${chalk.blue('Select the template you want to use:')}
`)

// just a form that will get a project name
async function GetName() {
  const answers = await inquirer.prompt({
    name: 'name',
    type: 'string',
    message: 'What should be the name of the project?',
    default() {
      return randomNumber(1111, 9999)+'_Project';
    },
  });
  qnt = answers.name
}

// this will fetch all the templates
let folders = fs.readdirSync(`${ScriptLocation}/addon`).filter(file => fs.statSync(path.join(`${ScriptLocation}/addon`, file)).isDirectory());
let foldersObject = {};
folders.forEach(folder => {
    foldersObject[folder] = folder;
}
);

cliSelect({
    values: foldersObject,
    valueRenderer: (value, selected) => {
        if (selected) {
            return chalk.underline(value);
        }
        return value;
    },
}).then(value => {
GetName().then(() => {
let src = `${ScriptLocation}/addon/${value.value}`;
let dest = `./${qnt}`
fs.copy(src, dest, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`${chalk.green('✅ Success!')} ${chalk.yellow('Your project has been created!')}`);
  }

});

})})