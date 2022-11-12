module.exports = {
  name: "roleinfo",
  aliases: ["ri"],
  description: "Helps remind you something",
  usage: "remind <time> <reminder>",
  async execute(message, args, cmd, client, Discord) {
    const role =
      message.guild.roles.cache.find((rolee) => rolee.id === args[0]) ||
      message.guild.roles.cache.some(
        (rolee) => rolee.name.toLowerCase() === args[0]
      );
    if (!role) return message.reply("Wrong role");
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setFooter("ID: " + role.id)
          .setColor("RANDOM")
          .setDescription(
            `Name: ${role.name}\nMembers: ${
              message.guild.members.cache.filter((m) =>
                m.roles.cache.has(role.id)
              ).size
            }\nColor: ${role.color}\nCreated <t:${Math.floor(
              Date.parse(role.createdAt) / 1000
            )}:R>`
          )
          .setTitle("Role info"),
      ],
    });
  },
};
