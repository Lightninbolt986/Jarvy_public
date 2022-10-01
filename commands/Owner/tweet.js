
module.exports = {
    name: 'tweet',
    aliases: ['tw'],
    description: 'Praise someone',
    async execute(message, args) {

        if (message.member.id === '543031298130837510'){
            const {TwitterApi} = require('twitter-api-v2');

            const client = new TwitterApi({
                appKey: 'BKUd67SpCDLHFw81RDyfC9nqu',
                appSecret: 'sgWrwCImfsSilZA0vD96rllsAwykoaxX9U0zYXSWBnQ1vjOsQi',
                accessToken: '1298277356054798336-6YxvcGLZia4AEMIunNRYfnVxsOIkmk',
                accessSecret: 'O4nSuK0uaQmxmdXWldYroHqATi8ZvDF5qeCtA8Sqq2LX2',
            });
            client.v1.tweet(args.join(' ')).then((val) => {
                message.reply(`Success\nLink:https://twitter.com/Lightninbolt986/status/${val.id_str}`)
            }).catch((err) => {
                console.log(err)
            })
          }
       
    }
  }