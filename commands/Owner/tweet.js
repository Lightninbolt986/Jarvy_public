module.exports = {
  name: "tweet",
  aliases: ["tw"],
  description: "Praise someone",
  async execute(message, args) {
    if (message.member.id === "543031298130837510") {
      const { TwitterApi } = require("twitter-api-v2");

      const client = new TwitterApi({
        appKey: process.env.twitter_appKey,
        appSecret: process.env.twitter_appSecret,
        accessToken: process.env.twitter_accessToken,
        accessSecret: process.env.twitter_accessSecret,
      });
      client.v1
        .tweet(args.join(" "))
        .then((val) => {
          message.reply(
            `Success\nLink:https://twitter.com/Lightninbolt986/status/${val.id_str}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
