#!/usr/bin/env node

// imports
import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk';
import updateNotifier from 'update-notifier';
import cliSelect from 'cli-select'
import inquirer from 'inquirer'
import boxen from 'boxen';


// variables
import packageJson from './package.json' assert {type: 'json'};
const version = packageJson.version
let qnt;
const ScriptLocation = path.dirname(process.argv[1]);
let addonLoc = 'NOT SET'  


function GetOS() {
var osValue = process.platform;
if (osValue == 'darwin') {
    addonLoc = `${ScriptLocation}/addon`
    return
}else if(osValue == 'win32'){
  addonLoc = `${ScriptLocation}/addon`
  return
}else if(osValue== 'android') {
  addonLoc = `${ScriptLocation}/addon`
    return
}else if(osValue== 'linux') {
  UsingLinux()
  return
}
else{
    console.log("OS not detected, you may have problems")
    addonLoc = `${ScriptLocation}/addon`
    return
}
}

// generate random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function UsingLinux() {
if (fs.existsSync(path.join(ScriptLocation, 'addon'))) {
  addonLoc = `${ScriptLocation}/addon`
    return
}
if (!fs.existsSync(path.join(ScriptLocation, 'addons'))) {
console.log(chalk.red("Linux detected, but addons folder not found"))
console.log(chalk.red.bold(`
There's no auto fix for it right now.
Follow this link to know how to fix it: https://github.com/itsP33t/EasyFivem/wiki/Fix-for-linux
npm location: ${ScriptLocation}
`))
process.exit()
}
}


GetOS() //.then(() => {
// Start
updateNotifier({pkg: packageJson}).notify();
console.log(boxen(`Current version: ${chalk.yellow(version)}
${chalk.green('Now you can import your own projects, just import the folder to')} ${chalk.gray(`${addonLoc}`)}`, {title: `${chalk.green('Easy')}${chalk.red('Fivem')} 🐌`, titleAlignment: 'center', borderColor: 'blue', borderStyle: 'round'}))
console.log(boxen(`${chalk.blue('Select the template you want to use. Use arrows to select and enter to confirm',)}`,{title: 'Select 🤔', titleAlignment: 'center', borderColor: 'green', borderStyle: 'round'}))


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


if (!fs.existsSync(path.join(ScriptLocation, '/addon'))) {
  console.log(chalk.red("addon folder not found, try reinstalling the EasyFivem, if it still doesn't work, create an issue on github"))
  process.exit()
}

// this will fetch all the templates
let folders = fs.readdirSync(`${addonLoc}`).filter(file => fs.statSync(path.join(`${addonLoc}`, file)).isDirectory());
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
let src = `${addonLoc}/${value.value}`;
let dest = `./${qnt}`
fs.copy(src, dest, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`${chalk.green('✅ Success!')} ${chalk.yellow('Your project has been created!')}`);
  }

});

})})
