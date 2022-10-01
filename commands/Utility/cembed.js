module.exports = {
name:'cembed',
description:'Send a embed using raw json',
async execute(message, args) {

    let chnl = message.channel
    let embed = args.join(' ')
    if (!args[0]) return message.channel.send({ content: `Send channel/json when` })
    if (message.mentions.channels.first()) {
      chnl = message.mentions.channels.first()
      let embd = args.slice(1)
      embed = embd.join(' ')

      if (!args[1]) return message.channel.send({ content: `send json when?` })
    }

    const channel = message.guild.channels.cache.get(chnl.id)

    try {
      const json = JSON.parse(embed)
      channel.send({ embeds: [json] })
    } catch (e) {
      message.channel.send(e)
    }
  
}
}