const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "hug",
  description: "Hug someone",
  async execute(message) {
    const member = message.mentions.members.first();

    //no mention no api call
    if (member == "" || member == null) {
      return message.reply(
        "Dude you had to ping one person and you screwed that up..."
      );
    }

    if (member.user.username === message.author.username) {
      return message.reply("We get it, you like yourself..");
    }

    try {
      fetch("https://some-random-api.ml/animu/hug")
        .then((res) =>
          res.json().then((url) => {
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle(
                    `${message.author.username} hugs ${member.user.username}`
                  )
                  .setImage(url.link)
                  .setColor("BLUE")
                  .setFooter({ text: "Nice." }),
              ],
            });
          })
        )
        .catch((err) => {
          console.log(err);
        });
      const profileModel = require("../../models/profileSchema");
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            hugs: 1,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
