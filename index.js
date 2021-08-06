require('dotenv').config()
const cron = require('cron')
const express = require('express')
const Discord = require('discord.js')
const links = require('./clases')
const cliente = new Discord.Client()
const app = express()
app.get('/', (req, res) => {
  res.send('Todo ok')
})
const LABORALES = [1, 2, 3, 4, 5]
let day;
let hour;
let clase;

/* Obtiene la fecha y hora actual cada minuto y setea las variables globales */
const obtainDay = () => {
  let today = new Date()
  let dia = today.getDay()
  let hora = today.getHours()
  /* let minuto = today.getMinutes() */
  day = dia
  /* minute = minuto */
  hour = hora
  if (hora === 12 || hora === 20) {
    clase = "primera"
  }
  else if (hora === 15) {
    clase = 'segunda'
  }
  else if (hora === 17) {
    clase = 'tercera'
  }
  else {
    clase = 'primera'
  }
  setTimeout(obtainDay, 60000)
}
obtainDay()

/* Boolean */
const isLaboral = LABORALES.includes(day)

/* Obtener materia segun dia y hora */
let subject = isLaboral ? links[day][clase] : null

cliente.on('ready', () => {
  console.log(`Logged in as ${cliente.user.tag}!`)
  const channelName = 'bot'
  const channel = cliente.channels.cache.find(channel => channel.name === channelName)

  /* Base de datos Job */
  const jobBase = new cron.CronJob('55 17 * * 1,4,5', () => {
    channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
  })
  /* Imperativa Job */
  const jobImperativa = new cron.CronJob('25 15 * * 1,3,4', () => {
    channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
  })
  /* Intro Informatica Job */
  const jobInformatica = new cron.CronJob('55 12 * * 1,3,5', () => {
    channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
  })
  /* Metodolgia Job */
  const jobMetodologia = new cron.CronJob('55 17 * * 3', () => {
    channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
  })
  /* Front job martes y jueves */
  const jobFrontMarYJue = new cron.CronJob('55 12 * * 2,4', () => {
    channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
  })
  /* Front job Viernes */
  const jobFrontVie = new cron.CronJob('25 15 * * 5', () => {
    channel.send(`/////////////////////////////////////////////////////////////////// \n:clipboard: La materia es ***${subject.materia}*** \n :link:${subject.aula}\n ${subject.link}`)
  })

  jobBase.start()
  jobImperativa.start()
  jobInformatica.start()
  jobFrontMarYJue.start()
  jobFrontVie.start()
  jobMetodologia.start()
})
cliente.login(process.env.CLIENT_TOKEN);