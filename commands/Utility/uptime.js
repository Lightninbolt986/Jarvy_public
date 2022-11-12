const pretty = require("pretty-ms");

module.exports = {
  name: "uptime",
  aliases: ["up"],

  description: "Shows uptime of bot",
  async execute(message, args, cmd, client, Discord) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Uptime is:")
      .setDescription(`${pretty(client.uptime)}`)
      .setColor("#ff0000");
    message.channel.send({ embeds: [embed] });
  },
};
