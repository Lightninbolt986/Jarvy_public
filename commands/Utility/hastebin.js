const hastebin = require('hastebin-gen');

module.exports = {
  name: 'hastebin',
  aliases: ['hb'],
  description: 'Posts a set of text in hastebin',
 async execute(message, args, cmd, client, Discord) {
    let haste = args.slice(0).join(" ")

    let type = args.slice(1).join(" ")

    if (!args[0]) { return message.channel.send("What do you want to post in Hastebin?") }

    hastebin(haste).then(r => {

      message.channel.send("`Posted to Hastebin at this URL:`  " + r);

    }).catch(console.error);


  }
}   
