const quick = require("quick.db");

module.exports = {
  name: "ping",
  description: "Get the bot's ping/latency.",
  async execute(message, args, cmd, client, Discord) {
    const ping = await getDBPingData();
    const messagePing = Date.now();
    const msg = await message.channel.send("Loading...");
    const endMessagePing = Date.now() - messagePing;

    const embed = new Discord.MessageEmbed()
      .setDescription(
        `
        Database ping data:
        - Fetch ping: \`${ping.endGet}ms\`
        - Wright ping: \`${ping.endWright}ms\`
        - Avrage ping: \`${ping.avarage}ms\`
        Message ping: \`${endMessagePing}ms\`
      `
      )
      .setColor("GREEN")
      .setTimestamp();

    message.channel.messages.edit(msg.id, {
      content: "** **",
      embeds: [embed],
    });
  },
};

async function getDBPingData() {
  const startGet = Date.now();
  await quick.get("QR=.");
  const endGet = Date.now() - startGet;

  const startWright = Date.now();
  await quick.set(
    "QR=.",
    Buffer.from(startWright.toString()).toString("base64")
  );
  const endWright = Date.now() - startWright;

  const avarage = (endGet + endWright) / 2;
  try {
    quick.delete("QR=.");
  } catch (error) { /* empty */ }
  return { endGet, endWright, avarage };
}
