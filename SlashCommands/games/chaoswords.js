const games = [];
var dictionaryarray = require("an-array-of-english-words");
function randomString(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "chaoswords",
  description: "Play a game of chaoswords",
  type: "CHAT_INPUT",
  async execute(interaction) {
    if (games.includes(interaction.channel.id))
      return interaction.reply({
        content: "There is already a game ongoing in this channel.",
        ephemeral: true,
      });
    //Setting necessary variables in global games
    games.push(interaction.channel.id);
    const word =
      dictionaryarray[Math.floor(Math.random() * dictionaryarray.length)];

    let string = randomString(30 - word.length);
    const i = Math.floor(Math.random() * string.length);
    const left = string.slice(0, i);
    const right = string.slice(i + 1);
    string = left + word + right;
    const msg = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("CHAOSWORDS!")
          .setDescription(
            `String - ${string}\n You have 30 seconds to find a word in the string.`
          )
          .setColor(`RANDOM`),
      ],
      fetchReply: true,
    });
    const collector = msg.channel.createMessageCollector({ time: 30000 });
    collector.on("collect", async (m) => {
      if (m.content === word) {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setTitle("CHAOSWORDS!")
              .setDescription(
                `String - ${string}\n${m.author.tag} has figured out the word - ${word}.`
              )
              .setColor(`RANDOM`),
          ],
        });
        collector.stop("win");
      }
    });
    collector.on("end", (e, r) => {
      games.splice(games.indexOf(interaction.channel.id), 1);
      if (r === "time") {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setTitle("CHAOSWORDS!")
              .setDescription(
                `String - ${string}\nNobody was able to figure out the word. It was ${word}.`
              )
              .setColor(`RANDOM`),
          ],
        });
      }
    });
  },
};
