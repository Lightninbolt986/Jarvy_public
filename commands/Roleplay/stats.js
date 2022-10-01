const { MessageEmbed } = require(`discord.js`)
const profileModel = require(`../../models/profileSchema`)
module.exports = {
  name: 'stats',
  aliases: ['statistics'],
  description: 'See your interation command stats',
  async execute(message, args, cmd, client, Discord) {
    let profileData
    let insults;
    let praises; 
    let hugs;
    let pats;
    let fucks;
    let winks;
    if (!args[0]){
      profileData = await profileModel.findOne({ userID: message.author.id })
      if (!profileData) {
        let profile = await profileModel.create({
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
          slaps: 0
        });
        profile.save();
      }
      insults = profileData.insults
      praises = profileData.praises
      hugs = profileData.hugs
      pats = profileData.pats
      fucks = profileData.fucks
      winks = profileData.winks
    if (message.channel.nsfw) {

      return message.reply({embeds:[new MessageEmbed()
        .setTitle(`Stats for ${message.author.username}-`)
        .setColor("RANDOM")
        .setDescription(`Insults - ${insults}\nPraises - ${praises}\nHugs - ${hugs}\nPats - ${pats}\nWinks - ${winks}\nFucks - ${fucks}`)
        .setFooter('Use interaction commands to increase your stats(j!help interactions)')

      ]})
    } else {
      return message.reply({embeds:[new MessageEmbed()
        .setTitle(`Stats for ${message.author.username}-`)
        .setColor("RANDOM")
        .setDescription(`Insults - ${insults}\nPraises - ${praises}\nHugs - ${hugs}\nPats - ${pats}\nWinks - ${winks}`)
        .setFooter('Use interaction commands to increase your stats(j!help interactions)')

      ]})
    }
  }

  const member = message.mentions.users.first();
  if(member){
    if (!args[1]){
      profileData = await profileModel.findOne({ userID: member.id})
      if (!profileData) {
        let profile = await profileModel.create({
          userID: member.id,
          serverID: message.guild.id,
          moni: 1000,
          bank: 0,
          hugs: 0,
          kisses: 0,
          insults: 0,
          praises: 0,
          fucks: 0,
          pats: 0,
          slaps: 0
        });
        profile.save();
      }
      insults = profileData.insults
      praises = profileData.praises
      hugs = profileData.hugs
      pats = profileData.pats
      fucks = profileData.fucks
      winks = profileData.winks
      if (message.channel.nsfw) {
        message.reply({embeds:[new MessageEmbed()
          .setTitle(`Stats for ${member.username}-`)
          .setColor("RANDOM")
          .setDescription(`Insults - ${insults}\nPraises - ${praises}\nHugs - ${hugs}\nPats - ${pats}\nWinks - ${winks}\nFucks - ${fucks}`)
          .setFooter('Use interaction commands to increase your stats(j!help roleplay)')
  
        ]})
      } else {
        message.reply({embeds:[new MessageEmbed()
          .setTitle(`Stats for ${member.username}-`)
          .setColor("RANDOM")
          .setDescription(`Insults - ${insults}\nPraises - ${praises}\nHugs - ${hugs}\nPats - ${pats}\nWinks - ${winks}`)
          .setFooter('Use interaction commands to increase your stats(j!help roleplay)')
  
        ]})
      }
    }
  }
  }
}