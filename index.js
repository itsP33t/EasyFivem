#!/usr/bin/env node
let version = '1.0.5'
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);
let qnt;
let md;
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
// random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(`
${chalk.gray('------------------------------------------------------')}  
- ${chalk.green('Easy')}${chalk.red('Fivem')} 🐌 
- Current version: ${chalk.yellow(version)}
- ${chalk.red('[!]')} ${chalk.bold.white('Please note that this version isn\'t fully tested, but it should work!')}')}}       
${chalk.gray('------------------------------------------------------')}
${chalk.blue('Select the template you want to use:')}
`)

// /////////
// CLASSIC
// /////////
const fxmanifest = (`
fx_version 'bodacious'
game 'gta5'

author 'EasyFivem'
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

const client = (`-- this is your client script
--[[
Thank you for using EasyFivem!
Useful resources:
Natives: https://docs.fivem.net/natives/
Object, ped, vehicle and more browser: https://forge.plebmasters.de/
Controls: https://docs.fivem.net/docs/game-references/controls/
Official Discord Server: https://discord.gg/fivem
--]]`)

const server = (`-- this is your server script
--[[
  Thank you for using EasyFivem!
  Useful resources:
  Natives: https://docs.fivem.net/natives/
  Object, ped, vehicle and more browser: https://forge.plebmasters.de/
  Controls: https://docs.fivem.net/docs/game-references/controls/
  Official Discord Server: https://discord.gg/fivem
  --]]`)

const config = (`Config = {}`)

// /////////
// NUI
// /////////

const nui_fxmanifest = (`
fx_version 'cerulean'
game 'gta5'

author 'EasyFivem'
version '1.0.0'

client_script {
  'config.lua',
  'client.lua'
}

ui_page "html/index.html"

files {
  'html/index.html',
  'html/index.js',
  'html/reset.css'
}

server_script {
  'server.lua'
}

escrow_ignore {
  'config.lua'
}

lua54 'yes'
`)
///////
const nui_client = (`
--[[ 
Thank you for using EasyFivem!
Useful resources:
Natives: https://docs.fivem.net/natives/
Object, ped, vehicle and more browser: https://forge.plebmasters.de/
Controls: https://docs.fivem.net/docs/game-references/controls/
Official Discord Server: https://discord.gg/fivem
--]]
local display = false


-- Just a Debug Command, uncomment to use it
  RegisterCommand("nui_on", function(source, args)
    SetDisplay(not display)
end)


RegisterNUICallback("exit", function(data)
    chat("exited", {0,255,0})
    SetDisplay(false)
end)

RegisterNUICallback("main", function(data)
    chat(data.text, {0,255,0})
    SetDisplay(false)
end)

RegisterNUICallback("error", function(data)
    chat(data.error, {255,0,0})
    SetDisplay(false)
end)

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool,
    })
end


--[[ 
This will disable keys when user is inside the NUI
--]]
Citizen.CreateThread(function()
    while display do
        Citizen.Wait(0)
        DisableControlAction(0, 1, display) -- LookLeftRight
        DisableControlAction(0, 2, display) -- LookUpDown
        DisableControlAction(0, 142, display) -- MeleeAttackAlternate
        DisableControlAction(0, 18, display) -- Enter
        DisableControlAction(0, 322, display) -- ESC
        DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
    end
end)

-- Just a CHAT function, because i want it to be standalone. I higly recommend if you use some sort of notification system instead.
function chat(str, color)
    TriggerEvent(
        'chat:addMessage',
        {
            color = color,
            multiline = true,
            args = {str}
        }
    )
end
`)

const nui_server = (`--This is your server resource
--[[ 
  Thank you for using EasyFivem!
  Useful resources:
  Natives: https://docs.fivem.net/natives/
  Object, ped, vehicle and more browser: https://forge.plebmasters.de/
  Controls: https://docs.fivem.net/docs/game-references/controls/
  Official Discord Server: https://discord.gg/fivem
--]]
`)

const nui_html = (`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>EasyFivem</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/styles.css">
<link rel="stylesheet" href="reset.css" type="text/css">
<script src="nui://game/ui/jquery.js" type="text/javascript"></script>
</head>
<body id="container" style="background: rgba(255,255,255,0);">
    <div class="container" style="margin-top: 10%;">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                      <h1><button id="close" class="btn btn-danger" type="button" style="margin-top: 9px;margin-right: 0px;margin-left: 16px;">X</button>Thank you for using FiveToolbox. Your NUI is ready to be edited</h1>
                        <form id="form"><input class="form-control" type="text" id="input" placeholder="Type anything here, then click the button"></form>
                        <div class="text-center"><button class="btn btn-primary" id="submit" type="button" style="margin-top: 9px;">Submit</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./index.js" type="text/javascript"></script>
</body>

</html>
`)

const nui_resetcss = (`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`)


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

async function Mode() {
  console.log(`${chalk.yellow('1) Normal Lua Project [LUA]')}
${chalk.magenta('2) Project with NUI [LUA]')}
`)
  const answers = await inquirer.prompt({
    name: 'mode',
    type: 'string',
    message: 'Please select',
    default() {
      return 1
    },
  });
  md = answers.mode
}

Mode().then(GetName).then(() => {
// Sadly needs to be there because i need to set the variable
  const nui_indexjs = (`
$(function () {
  function display(bool) {
      if (bool) {
          $("#container").show();
      } else {
          $("#container").hide();
      }
  }

  display(false)

  window.addEventListener('message', function(event) {
      var item = event.data;
      if (item.type === "ui") {
          if (item.status == true) {
              display(true)
          } else {
              display(false)
          }
      }
  })
  // if the person uses the escape key, it will exit the NUI
  document.onkeyup = function (data) {
      if (data.which == 27) {
          $.post('https://${qnt}/exit', JSON.stringify({}));
          return
      }
  };
  // if the person clicks the close button, it will exit the NUI
  $("#close").click(function () {
      $.post('https://${qnt}/exit', JSON.stringify({}));
      return
  })
  
  //when the user clicks on the submit button, it will run
  $("#submit").click(function () {
      let inputValue = $("#input").val()
      if (inputValue.length >= 100) {
          $.post("https://${qnt}/error", JSON.stringify({
              error: "Input was greater than 100"
          }))
          return
      } else if (!inputValue) {
          $.post("https://${qnt}/error", JSON.stringify({
              error: "There was no value in the input field"
          }))
          return
      }
      // if there are no errors from above, we can send the data back to the original callback and hanndle it from there
      $.post('https://${qnt}/main', JSON.stringify({
          text: inputValue,
      }));
      return;
  })
})
`)
  createDirIfNotExists(qnt)
  if(md == 1) {
    console.log(chalk.bold('Creating normal Lua project'))
    fs.writeFileSync(qnt+"/fxmanifest.lua", fxmanifest)
    console.log(chalk.green('✅ Created fxmanifest.lua'))
    fs.writeFileSync(qnt+"/client.lua", client)
    console.log(chalk.green('✅ Created client.lua'))
    fs.writeFileSync(qnt+"/server.lua", server)
    console.log(chalk.green('✅ Created server.lua'))
    fs.writeFileSync(qnt+"/config.lua", config)
    console.log(chalk.green('✅ Created config.lua'))
    console.log(chalk.green(`
    -------------------------------------------------------------------------------------
    Completed! Enjoy your new project and thank you for using ${chalk.red("EasyFivem")}
    -------------------------------------------------------------------------------------`))
  }
  else if(md == 2) {
    createDirIfNotExists(qnt+"/html")
    console.log(chalk.bold('Creating NUI project'))
    fs.writeFileSync(qnt+"/fxmanifest.lua", nui_fxmanifest)
    console.log(chalk.green('✅ Created fxmanifest.lua'))
    fs.writeFileSync(qnt+"/client.lua", nui_client)
    console.log(chalk.green('✅ Created client.lua'))
    fs.writeFileSync(qnt+"/server.lua", nui_server)
    console.log(chalk.green('✅ Created server.lua'))
    fs.writeFileSync(qnt+"/config.lua", config)
    console.log(chalk.green('✅ Created config.lua'))
    fs.writeFileSync(qnt+"/html/index.html", nui_html)
    console.log(chalk.green('✅ Created index.html'))
    fs.writeFileSync(qnt+"/html/reset.css", nui_resetcss)
    console.log(chalk.green('✅ Created reset.css'))
    fs.writeFileSync(qnt+"/html/index.js", nui_indexjs)
    console.log(chalk.green('✅ Created index.js'))
    console.log(chalk.green(`
    -------------------------------------------------------------------------------------
    Completed! Enjoy your new project and thank you for using ${chalk.red("EasyFivem")}
    -------------------------------------------------------------------------------------`))
  } else {
    console.log(chalk.red("There was an error, please try again"))
  }
})
