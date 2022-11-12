const twitter = require("twitter-api.js");
module.exports = {
  name: "twitter",
  description: "Check someone's status on twitter",

  async execute(message, args, cmd, client, Discord) {
    const user = args[0];
    if (!user) return message.channel.send("Provide your twitter name");
    const yesno = {
      true: "Yes",
      false: "No",
    };
    try {
      const body = await twitter.users(user);
      const url = body.url ? `[Here](${body.url})` : "None";
      const tweet = new Discord.MessageEmbed()
        .setColor("1590e0")
        .setTitle(body.screen_name)
        .setURL("https://twitter.com/" + body.screen_name)
        .addField("Name", body.screen_name, true)
        .addField("Location", body.location ? body.location : "None", true)
        .addField("Followers", `${body.followers_count}`, true)
        .addField("Friends", `${body.friends_count}`, true)
        .addField("Favourites", `${body.favourites_count}`, true)
        .addField("Tweets", `${body.statuses_count}`, true)
        .addField("Verified", yesno[body.verified], true)
        .addField("Created At", body.created_at, true)
        .addField("Featured URL", url, true)
        .addField("Description:", body.description ? body.description : "None")
        .setImage(body.profile_image_url_https.replace("_normal", ""));

      message.channel.send({ embeds: [tweet] });
    } catch (e) {
      if (e.status === 403)
        return message.channel.send(
          "This user private mode, or deleted account"
        );
      else if (e.status === 404)
        return message.channel.send("404, USER NOT FOUND");
      else
        return message.channel.send(
          `There was an unknown error: \`${e.message}\``
        );
    }
  },
};
