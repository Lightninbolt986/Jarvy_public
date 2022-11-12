module.exports = {
  name: "test",
  description: "Show all bots severs",
  async execute(message, args, cmd, client) {
    const Nuggies = require("nuggies");
    Nuggies.giveaways.create(client, {
      prize: "test",
      host: "543031298130837510",
      winners: 1,
      endAfter: "2m",
      channelID: "847081128942370826",
      requirements: {
        enabled: true,
        amariweekly: 2000,
        amarilevel: 100,
        key: process.env.amariApiKey,
      },
    });
  },
};
