const dhms = require("dhms");
module.exports = {
  name: "timer",
  description: "Set a timer",
  async execute(message, args, cmd, client, Discord) {
    const name = args.slice(1).join(" ");
    if (!args[0] || !dhms(args[0]))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setTitle("Invalid arguments")
            .setDescription("You must mention a valid time for the command")
            .setColor("RED"),
        ],
      });
    if (!name)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setTitle("Invalid arguments")
            .setDescription("You must mention a valid name for the timer")
            .setColor("RED"),
        ],
      });
    let time = (Date.now() + dhms(args[0])) / 1000;
    time = time.toFixed();
    const dhmsg = await message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle("Timer by " + message.author.tag)
          .setDescription(
            `The timer for ${name} ends at <t:${time}:F> which is <t:${time}:R>`
          ),
      ],
    });
    setTimeout(function () {
      message.channel.messages.edit(dhmsg.id, {
        embeds: [
          new Discord.MessageEmbed()
            .setTitle("Timer by " + message.author.tag)
            .setDescription(`The timer for ${name} has ended.`),
        ],
      });
    }, dhms(args[0]));
  },
};
