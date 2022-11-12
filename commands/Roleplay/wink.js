const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "wink",
  description: "Wink at someone",
  async execute(message) {
    const member = message.mentions.members.first();

    //no mention no api call
    if (member == "" || member == null) {
      return message.reply(
        "Dude you had to ping one person and you screwed that up..."
      );
    }

    try {
      fetch("https://some-random-api.ml/animu/wink")
        .then((res) =>
          res.json().then((url) => {
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle(
                    `${message.author.username} winks at ${member.user.username}`
                  )
                  .setImage(url.link)
                  .setColor("BLUE")
                  .setFooter("Wink!"),
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
            winks: 1,
          },
        },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
