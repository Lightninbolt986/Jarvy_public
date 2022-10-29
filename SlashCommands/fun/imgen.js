const { MessageAttachment } = require("discord.js");

module.exports = {
  name: "imgen",
  description: "A vareity of image generation commands",
  type: "CHAT_INPUT",
  options: [
    {
      name: "ascii",
      description: "Ascii-fy a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "delete",
      description: "Delete a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "dissolve",
      description: "Dissolve a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "discord",
      description: "Create a realistic looking fake discord message",
      type: 1,
      options: [
        {
          name: "text",
          description: "Text of the message",
          type: "STRING",
          required: true,
        },
        {
          name: "user",
          description:
            "The user whos profile picture will be used. Leave empty to use yours",
          type: "USER",
          required: false,
        },
        {
          name: "username",
          description: "Username of the user. Leave empty to use yours.",
          type: "STRING",
          required: false,
        },
        {
          name: "dark",
          description:
            "Whether or not to use dark mode. Leave empty to set it to dark",
          type: "BOOLEAN",
          requried: "false",
        },
      ],
    },
    {
      name: "flip",
      description: "Flip a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "fiveguyonegirl",
      description: "Show two uers on the 5 guys 1 girl meme",
      type: 1,
      options: [
        {
          name: "girl",
          description: "The face of the girl.",
          type: "USER",
          required: true,
        },
        {
          name: "men",
          description:
            "The face of the men. Leave empty to apply it to yourself",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "hitler",
      description:
        "Show a user as worse than hitler. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "jail",
      description: "Jail a user. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "lego",
      description: "Lego-fy a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "magik",
      description: "Magik-fy a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "mirror",
      description: "Mirror a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "obama",
      description:
        "Apply obama meme on a user. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "petpet",
      description: "Pet a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "pride",
      description:
        "Add pride effect to a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "type",
          description: "Type of pride effect to apply",
          type: "STRING",
          required: true,
          choices: [
            { name: "Asexual", value: "Asexual" },
            { name: "Bisexual", value: "Bisexual" },
            { name: "Gay", value: "Gay" },
            { name: "Genderfluid", value: "Genderfluid" },
            { name: "Genderqueer", value: "Genderqueer" },
            { name: "Intersex", value: "Intersex" },
            { name: "Lesbian", value: "Lesbian" },
            { name: "Nonbinary", value: "Nonbinary" },
            { name: "Progress", value: "Progress" },
            { name: "Pansexual", value: "Pan" },
            { name: "Transgender", value: "Trans" },
          ],
        },
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "shatter",
      description: "Shatter a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "sketch",
      description: "Sketch a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "spin",
      description: "Spin a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "slap",
      description: "Show one user slapping another",
      type: 1,
      options: [
        {
          name: "slapped",
          description: "The person being slapped",
          type: "USER",
          required: true,
        },
        {
          name: "slapper",
          description:
            "The person slapping the other.  Leave empty to apply it to yourself",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "trash",
      description: "Trash a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "triggered",
      description: "Trigger a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "tweet",
      description: "Create a realistic looking fake tweet",
      type: 1,
      options: [
        {
          name: "text",
          description: "Text of the tweet",
          type: "STRING",
          required: true,
        },
        {
          name: "user",
          description:
            "The user whos profile picture will be used. Leave empty to use yours",
          type: "USER",
          required: false,
        },
        {
          name: "username",
          description: "Username of the tweeter. Leave empty to use yours.",
          type: "STRING",
          required: false,
        },
      ],
    },
    {
      name: "wanted",
      description:
        "Show a user's pfp as wanted. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "wasted",
      description:
        "GTA-V wasted-fy a user's pfp. Leave empty to apply it to yourself",
      type: 1,
      options: [
        {
          name: "user",
          description: "User to apply filter on",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "whyareyougay",
      description: "Show two users on the 'Why are you gay' meme",
      type: 1,
      options: [
        {
          name: "respondent",
          description: "The person from whom the question is being asked.",
          type: "USER",
          required: true,
        },
        {
          name: "questioner",
          description:
            "The person asking the question. Leave empty to apply it to yourself",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "youtube",
      description: "Create a realistic looking fake youtube comment",
      type: 1,
      options: [
        {
          name: "text",
          description: "Text of the comment",
          type: "STRING",
          required: true,
        },
        {
          name: "user",
          description:
            "The user whos profile picture will be used. Leave empty to use yours",
          type: "USER",
          required: false,
        },
        {
          name: "username",
          description: "Username of the commenter. Leave empty to use yours.",
          type: "STRING",
          required: false,
        },
        {
          name: "dark",
          description:
            "Whether or not to use dark mode. Leave empty to set it to dark",
          type: "BOOLEAN",
          requried: "false",
        },
      ],
    },
  ],
  async execute(interaction, client) {
    const type = interaction.options.getSubcommand();
    if (
      [
        "ascii",
        "blur",
        "delete",
        "dissolve",
        "flip",
        "gay",
        "hitler",
        "jail",
        "lego",
        "magik",
        "mirror",
        "petpet",
        "pixel",
        "shatter",
        "sketch",
        "spin",
        "trash",
        "obama",
        "triggered",
        "wanted",
        "wasted",
      ].includes(type)
    ) {
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;

        const user = interaction.options.getUser("user") || interaction.user;
        var url = user.displayAvatarURL({ size: 1024, dynamic: true });
        url = url.replace(".webp", ".png");
        const img = await dagpicl.image_process(type, { url: url });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
      }
    } else if (type == "pride") {
      const flag = interaction.options.getString("type").toLowerCase();
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;
        const user = interaction.options.getUser("user") || interaction.user;
        var url = user.displayAvatarURL({ size: 1024, dynamic: true });
        url = url.replace(".webp", ".png");
        const img = await dagpicl.image_process("pride", { url, flag });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
      }
    } else if (type == "fiveguyonegirl") {
      const user = interaction.options.getUser("men") || interaction.user;
      const user2 = interaction.options.getUser("girl");
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;
        var url3 = user.displayAvatarURL({ size: 1024, dynamic: true });
        var url4 = user2.displayAvatarURL({ size: 1024, dynamic: true });
        const url = url3.replace(".webp", ".png");
        const url2 = url4.replace(".webp", ".png");
        const img = await dagpicl.image_process("5g1g", { url, url2 });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
        console.log(err);
      }
    } else if (type == "whyareyougay") {
      const user = interaction.options.getUser("respondent");
      const user2 =
        interaction.options.getUser("questioner") || interaction.user;
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;
        var url3 = user.displayAvatarURL({ size: 1024, dynamic: true });
        var url4 = user2.displayAvatarURL({ size: 1024, dynamic: true });
        const url = url4.replace(".webp", ".png");
        const url2 = url3.replace(".webp", ".png");
        const img = await dagpicl.image_process("whyareyougay", { url, url2 });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
        console.log(err);
      }
    } else if (type == "slap") {
      const user = interaction.options.getUser("slapped");
      const user2 = interaction.options.getUser("slapper") || interaction.user;
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;
        var url3 = user.displayAvatarURL({ size: 1024, dynamic: true });
        var url4 = user2.displayAvatarURL({ size: 1024, dynamic: true });
        const url = url3.replace(".webp", ".png");
        const url2 = url4.replace(".webp", ".png");
        const img = await dagpicl.image_process("slap", { url, url2 });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
        console.log(err);
      }
    } else if (type == "tweet") {
      const user = interaction.options.getUser("user") || interaction.user;
      const text = interaction.options.getString("text");
      const username =
        interaction.options.getString("username") || interaction.user.username;
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;
        var url = user.displayAvatarURL({ size: 1024, dynamic: true });
        url = url.replace(".webp", ".png");
        const img = await dagpicl.image_process("tweet", {
          url,
          text,
          username,
        });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
        console.log(err);
      }
    } else if (type == "discord") {
      const user = interaction.options.getUser("user") || interaction.user;
      const text = interaction.options.getString("text");
      const username =
        interaction.options.getString("username") || interaction.user.username;
      const dark = interaction.options.getBoolean("dark");
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;
        var url = user.displayAvatarURL({ size: 1024, dynamic: true });
        url = url.replace(".webp", ".png");
        const img = await dagpicl.image_process("discord", {
          url,
          text,
          username,
          dark,
        });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
        console.log(err);
      }
    } else if (type == "youtube") {
      const user = interaction.options.getUser("user") || interaction.user;
      const text = interaction.options.getString("text");
      const username =
        interaction.options.getString("username") || interaction.user.username;
      const dark = interaction.options.getBoolean("dark");
      await interaction.deferReply();
      try {
        const dagpicl = client.dagpi;
        var url = user.displayAvatarURL({ size: 1024, dynamic: true });
        url = url.replace(".webp", ".png");
        const img = await dagpicl.image_process("yt", {
          url,
          text,
          username,
          dark,
        });
        const attach = new MessageAttachment(img.image, `output.${img.format}`);
        interaction.editReply({ content: null, files: [attach] });
      } catch (err) {
        interaction.editReply("error");
        console.log(err);
      }
    }
  },
};
