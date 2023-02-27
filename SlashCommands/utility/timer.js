const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "timer",
  description: "Create a timer",
  type: "CHAT_INPUT",
  options: [
    {
      name: "time",
      type: "STRING",
      description: "Time remaining in the timer",
      required: true,
    },
    {
      name: "mention-all",
      type: "BOOLEAN",
      description: "Wheather or not to ping every user who reacts",
      required: true,
    },
    {
      name: "title",
      type: "STRING",
      description: "The title for the timer",
      required: false,
    },
  ],
  async execute(interaction) {
    const time = interaction.options.getString("time");
    const title = interaction.options.getString("title") || "Timer";
    const mentionaAll = interaction.options.getBoolean("mention-all");
    const msTime = ms(time);
    if (!msTime)
      return interaction.reply({
        content: "The time you entered is invalid",
        ephemeral: true,
      });
    const finalTime = Date.now() + msTime;
    const unixTime = Math.floor(finalTime / 1000); /*
    const embed = new Messagee */
    const dot = "<a:JBC_timer:1002832153958162513>";
    const embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(
        `${dot} Hey everyone, <@${interaction.user.id}> started a timer for **${time}**! The timer ends <t:${unixTime}:R>`
      )
      .setColor("#5865F2");
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    await msg.react("⌚");
    setTimeout(() => {
      if (mentionaAll) {
        let final = [];
        let str = "";
        [
          ...msg.reactions.cache
            .first()
            .users.cache.filter((e) => !e.bot)
            .keys(),
        ]
          .map((e) => `<@${e}>`)
          .map((m) => {
            str += str == "" ? m : "," + m;
            if (str.length > 2000) {
              final.push(str);
              str = "";
            }
          });
        final.push(str);
        final = final.map((e) => e);
        final.forEach(async (e) => {
          const m = await msg.channel.send(e);
          setTimeout(() => {
            m.delete();
          }, 1000);
        });
      }
      embed.setDescription(embed.description.replace("ends", "ended"));
      msg.edit({ embeds: [embed] });
      interaction.followUp("The timer has ended!");
    }, msTime);
  },
};
