module.exports = {
  name: "nickme",
  aliases: ["nm"],
  description: "Praise someone",
  async execute(message, args) {
    if (
      message.member.id == "543031298130837510" ||
      message.member.id == "654639494481313792"
    ) {
      const term = args.join(" ");
      message.guild.me.setNickname(term);
      message.channel.send("done");
    }
  },
};
