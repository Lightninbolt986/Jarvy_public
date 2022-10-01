const { MessageEmbed } = require(`discord.js`)
const db = require(`quick.db`)
const fetch = require("node-fetch");
module.exports = {
  name: 'pat',
  description: 'Pat someone',
  async execute(message, args, cmd, client, Discord) {


    let member = message.mentions.members.first();

    //no mention no api call
    if (member == '' || member == null) {
      return message.reply(
        'Dude you had to ping one person and you screwed that up...'
      );
    }

    try {
      fetch(
        `https://some-random-api.ml/animu/pat`).then(res =>
          res.json()
            .then(url => {
              message.reply({embeds:[new MessageEmbed()
                .setTitle(`${message.author.username} pats ${member.user.username}`)
                .setImage(url.link)
                .setColor("BLUE")
                .setFooter('Nice.')
              ]})
            }))
        .catch((err) => {
          console.log(err);
        });
        const profileModel = require(`../../models/profileSchema`)
        const response = await profileModel.findOneAndUpdate({
          userID: message.author.id
        }, {
            $inc: {
              pats: 1
            }
          }
        );
    } catch (err) {
      console.log(err);
    }
  }
}
