const cooldowns = new Map();

const { paginate, TextSmall } = require("../../functions");
module.exports = async (Discord, client, message) => {
  let prefix;

  if (message.author.bot) return;
  if (message.guild) {
    const guild = require("../../models/guildSchema");
    const data = await guild.findOne({
      GuildID: message.guild?.id,
    });
    if (!data) {
      try {
        const profileModel = require("../../models/guildSchema");

        let profile = await profileModel.create({
          GuildID: message.guild.id,
        });
        profile.save();
      } catch (err) {
        console.log(err);
      }
    }
    const data2 = await guild.findOne({
      GuildID: message.guild?.id,
    });
    prefix = data2.Prefix;
  } else prefix = "j!";
  const profileModel = require("../../models/profileSchema");
  let profileData;
  profileData = await profileModel.findOne({
    userID: message.author.id,
  });
  if (!profileData) {
    profileData = await profileModel.create({
      userID: message.author.id,
      serverID: message.guild.id,
      moni: 1000,
      bank: 0,
      hugs: 0,
      kisses: 0,
      insults: 0,
      praises: 0,
      fucks: 0,
      pats: 0,
      slaps: 0,
    });
    profileData.save();
  }

  if (profileData?.is_afk) {
    message.channel.send(
      "Welcome back `" + message.author.username + "`! You are no longer afk."
    );
    message.member
      .setNickname(
        `${
          message.member?.nickname?.replace("[AFK] ", "") ||
          message.author.username
        }`
      )
      .catch(() => {});
    profileData.is_afk = false;
    profileData.afkreason = null;
    const ping = profileData.afkPings.map((i) => {
      return `<:CH_h1_maindot:987347112419274813> <@${i.pinger}> - <t:${i.time}:R> [Jump to message](${i.url})\n**Message Content**: *${i.content}*\n━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\n`;
    });
    const embed = {};
    let embedslist = [];
    var i,
      j,
      temporary,
      chunk = 5;
    for (i = 0, j = ping.length; i < j; i += chunk) {
      temporary = ping.slice(i, i + chunk);
      embed[`${i / chunk}`] = new Discord.MessageEmbed()
        .setDescription(`${temporary.join(``)}`)
        .setColor("BLURPLE");
    }
    for (let i = 0; i < Object.keys(embed).length; i++) {
      embedslist.push(embed[i]);
    }
    profileData.afkPings = [];
    await profileData.save();
    if (embedslist.length > 1) paginate(embedslist, message);
    else if (embedslist.length) message.channel.send({ embeds: embedslist });
  }

  message.mentions.users.forEach(async (u) => {
    if (message.author.id == u.id) return;
    const pingUser = await profileModel.findOne({
      userID: u.id,
    });
    if (pingUser?.is_afk) {
      const e = await profileModel.findOneAndUpdate(
        {
          userID: u.id,
        },
        {
          $push: {
            afkPings: {
              pinger: message.author.id,
              url: message.url,
              channel: message.channel.id,
              content: TextSmall(message.content, 100),
              time: (Date.now() / 1000).toFixed(0),
            },
          },
        },
        {
          new: true,
        }
      );
      e.save();
      const afk = new Discord.MessageEmbed()
        .setAuthor({
          name: `${u.username} is AFK`,
          iconURL: u.displayAvatarURL({
            dynamic: true,
          }),
        })
        .setDescription(`${pingUser.afkreason}`)
        .setColor("BLURPLE");

      message
        .reply({
          embeds: [afk],
          allowedMentions: {
            repliedUser: true,
          },
        })
        .then((m) => {
          setTimeout(() => {
            m.delete();
          }, 20000);
        });
    }
  });
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (command) {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown;

    if (time_stamps.has(message.author.id)) {
      const expiration_time =
        time_stamps.get(message.author.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            "Woah! Chill out.",
            "https://cdn.discordapp.com/emojis/831761508676927528.png"
          )
          .setDescription(
            `<:jarvy_redarrow:892705185518981130>Have some patience, don't try to break me.\n<:jarvy_redarrow:892705185518981130>You can use \`${
              command.name
            }\` again in **${time_left.toFixed(
              1
            )} seconds**.\n<:jarvy_redarrow:892705185518981130>Default cooldown for \`${
              command.name
            }\` is **${command.cooldown / 1000} seconds**`
          )
          .setColor(16733011);
        return message.reply({
          embeds: [embed],
        });
      }
    }
    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    if (message.guild) {
      const userperms = command.permissions?.user || [];
      const botperms = command.permissions?.bot || [];
      if (
        !message.member.permissions.has(userperms) &&
        message.author.id !== "543031298130837510"
      )
        return message.channel.send(
          "You do not have the required permissions to run this command. Run " +
            prefix +
            " help " +
            command.name +
            " for more info"
        );
      if (!message.guild.me.permissions.has(botperms))
        return message.channel.send(
          `I dont have the required permissions for that. Run ${prefix}help ${command.name} for more information`
        );
    }
    command
      .execute(message, args, cmd, client, Discord, profileData)
      .catch((e) => {
        message.reply(
          "yo bro err new embed soon, right <@654639494481313792>?"
        );
        client.handle.createrr(client, message.guild.id, message.content, e);
      });
  }
};
