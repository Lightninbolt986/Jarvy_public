/* module.exports = {
  name: "info",
  description: "Get info about different words or users from different sources",
  options: [
    {
      name: "steam",
      description: "Get info about a steam application",
      type: 1,
      options: [
        {
          name: "name",
          description: "The name of the steam application",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "user",
      description: "Get info about a discord user",
      type: 1,
      options: [
        {
          name: "user",
          description: "The user to get info about",
          type: "USER",
          required: true,
        },
      ],
    },
    {
      name: "periodic",
      description: "Get info about a periodic element",
      type: 1,
      options: [
        {
          name: "element",
          description:
            "The name, symbol or periodic number of the periodic element",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "github",
      description: "Get info about a github user",
      type: 1,
      options: [
        {
          name: "username",
          description: "The github username to get info about",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "subreddit",
      description: "Get info about a subreddit",
      type: 1,
      options: [
        {
          name: "name",
          description: "The name of the subreddit",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "npm",
      description: "Get info about an npm package",
      type: 1,
      options: [
        {
          name: "name",
          description: "The name of the npm package",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "playstore",
      description: "Get info about aplaystore app",
      type: 1,
      options: [
        {
          name: "name",
          description: "The name of the app",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "itunes",
      description: "Get info about a saong from itnues",
      type: 1,
      options: [
        {
          name: "name",
          description: "The name of the song",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  async execute(interaction, client) {
    const {steam} = require("popcat-wrapper");
    steam
  },
};
 */