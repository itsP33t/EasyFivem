const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);

let name = "You"

//TODO: set author

//files
const fxmanifest = (`
fx_version 'bodacious'
game 'gta5'

author '${name}'
version '1.0.0'

client_script {
  'config.lua',
  'client.lua'
}

server_script {
  'server.lua'
}

escrow_ignore {
  'config.lua'
}

lua54 'yes'
`)

const client = (`
// this is your client script
`)

const server = (`
// this is your server script
`)

const config = (`
Config = {}

`)


import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';


let qnt;
// random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


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

  GetName().then(() => {
    createDirIfNotExists("Projects")
    createDirIfNotExists("Projects/"+qnt)
    // create fxmanifest.lua and client.lua
    fs.writeFileSync("Projects/"+qnt+"/fxmanifest.lua", fxmanifest)
    fs.writeFileSync("Projects/"+qnt+"/client.lua", client)
    fs.writeFileSync("Projects/"+qnt+"/server.lua", server)
    // create config.lua
    fs.writeFileSync("Projects/"+qnt+"/config.lua", config)
    console.log("Files created successfully!")  
  
  })