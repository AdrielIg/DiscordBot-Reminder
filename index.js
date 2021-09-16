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

const DAYS = {
  1: 'lunes',
  2: 'martes',
  3: 'miercoles',
  4: 'jueves',
  5: 'viernes',
  6: 'sabado',
  7: 'domingo',
  0: 'domingo',
}


/* Obtiene la fecha y hora actual cada minuto y setea las variables globales */
const obtainDay = () => {
  let today = new Date()
  let dia = today.getDay()
  let clase;
  let dateArg = new Date().toLocaleString("en-US", { timeZone: 'America/Argentina/Buenos_Aires' })
  let argentina = new Date(dateArg);
  let hora = parseInt(("0" + argentina.getHours()).slice(-2));

  if (hora === 12 || hora === 20) {
    clase = "primera"
  }
  else if (hora === 15 || hora === 13) {
    clase = 'segunda'
  }
  else if (hora === 17) {
    clase = 'tercera'
  }
  else {
    clase = 'segunda'
  }
  const num = dia.toString()
  let subject = links[DAYS[num]][clase]
  return subject
}

cliente.on('message', (message) => {
  const channelName = '📅｜clases';
  const channel = cliente.channels.cache.find(channel => channel.name === channelName);
  if (message.content == 'hi') {
    channel.send('@everyone Volvi, y en forma de fichas :sunglasses:')
  }
})

cliente.on('ready', () => {
  console.log(`Logged in as ${cliente.user.tag}!`)
  const channelName = '📅｜clases'
  const channel = cliente.channels.cache.find(channel => channel.name === channelName)


  /* POO JOB */
  const jobPOO = new cron.CronJob('25 15 * * 1,3,4', () => {
    const subject = obtainDay()
    channel.send(`/////////////////////////////////////////////////////////////////// \n @everyone  \n:clipboard: La materia es ***${subject.materia}*** \n :school_satchel:${subject.aula}\n :link: ${subject.link}`)
  }, null, true, "America/Argentina/Buenos_Aires")
  /* Front End II */
  const jobFront = new cron.CronJob('55 17 * * 1,3,5', () => {
    const subject = obtainDay()
    channel.send(`/////////////////////////////////////////////////////////////////// \n @everyone  \n:clipboard: La materia es ***${subject.materia}*** \n :school_satchel:${subject.aula}\n :link: ${subject.link}`)
  }, null, true, "America/Argentina/Buenos_Aires")

  /* Desing Thinking Job */

  const jobDesing = new cron.CronJob('55 17 * * 4', () => {
    const subject = obtainDay()
    channel.send(`/////////////////////////////////////////////////////////////////// \n @everyone  \n:clipboard: La materia es ***${subject.materia}*** \n :school_satchel:${subject.aula}\n :link: ${subject.link}`)
  }, null, true, "America/Argentina/Buenos_Aires")

  /* Testing I JOB */
  const jobTesting = new cron.CronJob('55 12 * * 1,5', () => {
    const subject = obtainDay()
    channel.send(`/////////////////////////////////////////////////////////////////// \n @everyone  \n:clipboard: La materia es ***${subject.materia}*** \n :school_satchel:${subject.aula}\n :link: ${subject.link}`)
  }, null, true, "America/Argentina/Buenos_Aires")

  const jobTestingMartes = new cron.CronJob('55 17 * * 2', () => {
    const subject = obtainDay()
    channel.send(`/////////////////////////////////////////////////////////////////// \n @everyone  \n:clipboard: La materia es ***${subject.materia}*** \n :school_satchel:${subject.aula}\n :link: ${subject.link}`)
  }, null, true, "America/Argentina/Buenos_Aires")

  /* Infraestructura */
  const jobInfra = new cron.CronJob('25 15 * * 2,5', () => {
    const subject = obtainDay()
    channel.send(`/////////////////////////////////////////////////////////////////// \n @everyone  \n:clipboard: La materia es ***${subject.materia}*** \n :school_satchel:${subject.aula}\n :link: ${subject.link}`)
  }, null, true, "America/Argentina/Buenos_Aires")

  const jobInfraJueves = new cron.CronJob('55 12 * * 4', () => {
    const subject = obtainDay()
    channel.send(`/////////////////////////////////////////////////////////////////// \n @everyone  \n:clipboard: La materia es ***${subject.materia}*** \n :school_satchel:${subject.aula}\n :link: ${subject.link}`)
  }, null, true, "America/Argentina/Buenos_Aires")



  jobPOO.start();
  jobFront.start();
  jobDesing.start();
  jobTesting.start();
  jobTestingMartes.start();
  jobInfra.start();
  jobInfraJueves.start();

})

cliente.on('error', () => {
  const channelName = '📅｜clases';
  const channel = cliente.channels.cache.find(channel => channel.name === channelName);
  channel.send('Me mori porque el raton de adriel no quiere pagar un server :rat:')
})

const PORT = 8080

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server inicializado en el puerto: ${PORT}`)
})


cliente.login(process.env.CLIENT_TOKEN);