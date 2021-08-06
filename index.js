require('dotenv').config()
const cron = require('cron')
const Discord = require('discord.js')
const links = require('./clases')
const cliente = new Discord.Client()



let counter = 0
let day = 7
let hour;
let minute;
let clase;

/* Obtiene la fecha y hora actual cada minuto y setea las variables globales */
const obtainDay = () => {
  let today = new Date()
  let dia = today.getDay()
  let hora = today.getHours()
  let minuto = today.getMinutes()
  /* day = dia */
  minute = minuto
  hour = hora
  console.log(minuto)
  if ((hora <= 14 && hora >= 0) || hora > 18) {
    clase = "primera"
  }
  else if (hora === 15) {
    clase = 'segunda'
  }
  else if (hora === 17) {
    clase = 'tercera'
  }

  setTimeout(obtainDay, 60000)
}
obtainDay()

cliente.on('ready', () => {
  console.log(`Logged in as ${cliente.user.tag}!`)
  const channelName = 'bot'
  const channel = cliente.channels.cache.find(channel => channel.name === channelName)
  channel.send('hola')
  /* Checkea cada minuto si tiene que enviar o no el mensaje */
  function checking() {

    if ((day < 1 || day > 5) && hour === 8 && minute === 1) {
      channel.send(':partying_face: Hoy no clases papaaa :partying_face:')
    }

    else if (day >= 1 || day <= 5) {

      let subject = day >= 1 || day <= 5 ? links[day][clase] : null

      if (hour === 12 && minute === 55) {
        channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
      }
      else if (hour === 15 && minute === 25) {
        channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
      }
      else if (hour === 17 && minute === 55) {
        channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
      }
      else {
        return
      }
    }
    else {
      return
    }


    ifsetTimeout(checking, 60000)
  }
  checking()
})







cliente.login(process.env.CLIENT_TOKEN);