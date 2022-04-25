#!/usr/bin/env node
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


// NUI
const nui = (`




// TODO




`)


import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

let md;

let qnt;
// random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console.log(`
// 1) Normal Lua Project (client, config, fxmanifest, server)
// `)
// async function Mode() {
//   const answers = await inquirer.prompt({
//     name: 'mode',
//     type: 'string',
//     message: 'Please select',
//     default() {
//       return 1
//     },
//   });
//   md = answers.mode
// }


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
    createDirIfNotExists(qnt)
    fs.writeFileSync(qnt+"/fxmanifest.lua", fxmanifest)
    fs.writeFileSync(qnt+"/client.lua", client)
    fs.writeFileSync(qnt+"/server.lua", server)
    // create config.lua
    fs.writeFileSync(qnt+"/config.lua", config)
    console.log("✅ Files created successfully!")  
  
  })