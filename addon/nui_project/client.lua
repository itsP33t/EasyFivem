
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
