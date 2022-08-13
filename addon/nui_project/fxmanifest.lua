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
