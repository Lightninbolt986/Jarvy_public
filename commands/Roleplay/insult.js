const insulter = require("insult");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "insult",
  aliases: ["roast"],
  description: "Insult someon",
  async execute(message) {
    const insult = insulter.Insult();

    //no mention no api call
    const member = message.mentions.members.first();

    if (member == "" || member == null) {
      return message.reply(
        "Dude you had to include two things and you screwed that up..."
      );
    }

    if (member.id == "543031298130837510") {
      return message.channel.send(
        "https://tenor.com/view/kick-balls-kick-in-the-balls-gif-12707456"
      );
    }

    if (member.user.username === message.author.username) {
      message.reply("Dang hating on themself.. I mean I guess I can..");
    }
    try {
      message.channel
        .send({
          embeds: [
            new MessageEmbed()
              .setTitle(
                `${message.author.username} insults ${member.user.username}`
              )
              .setDescription(insult)
              .setColor("BLUE")
              .setFooter("Rude."),
          ],
        })
        .then((e) => {
          e.react("🔥");
        })
        .catch((err) => {
          console.log("insult error " + err);
        });
      const profileModel = require("../../models/profileSchema");
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            insults: 1,
          },
        }
      );
    } catch (err) {
      console.log("insult api error " + err);
    }
  },
};
