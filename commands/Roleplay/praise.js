const unirest = require('unirest');
const { MessageEmbed } = require(`discord.js`)
const db = require(`quick.db`)
const profileModel = require(`../../models/profileSchema`)
module.exports = {
  name: 'praise',
  aliases: ['compliment'],
  description: 'Praise someone',
  async execute(message, args, cmd, client, Discord) {
    var req = unirest('GET', 'https://complimentr.com/api');
    let member = message.mentions.members.first();

    //no mention no api call
    if (member == '' || member == null) {
      return message.reply(
        'Dude you had to include two things and you screwed that up...'
      );
    }

    if (member.user.username === message.author.username) {
      return message.reply(
        'We get it, you like yourself..'
      );
    }

    req.end((res) => {
      var praise = String(res.body.compliment);
      try {
        message.reply({embeds:[new MessageEmbed()
          .setTitle(`${message.author.username} praises ${member.user.username}`)
          .setDescription(praise)
          .setColor("BLUE")
          .setFooter('Kind.')]})
          .then((e) => {
            e.react('🙏');
          })
          .catch((err) => console.log('praise stat error ' + err))
      } catch (err) {
        console.log('praise api error ' + err)
      }

    });
    const response = await profileModel.findOneAndUpdate({
      userID: message.author.id
    }, {
      $inc: {
        praises: 1
      }
    }
    );
  }
}