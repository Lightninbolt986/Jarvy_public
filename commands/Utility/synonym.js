var thesaurus = require("thesaurus");
module.exports = {
  name: 'synonym',
  description: 'Find synonyms for a word',
 async execute(message, args, cmd, client, Discord) {
    if (!args[0]) {
      return message.reply('What do you want me to search?')
    }

    var synonyms = thesaurus.find(args)
    if (!synonyms[0]) {
      return message.reply("No synonyms found, WTF did you search?")
    }
    if (synonyms.length > 5) {
      message.reply(`${synonyms[0]}
${synonyms[1]}
${synonyms[2]}
${synonyms[3]}
${synonyms[4]}`)
    } else if (synonyms.length <= 5){
      // basically returns a list of similar words
      message.reply(synonyms);
    }
  }
}