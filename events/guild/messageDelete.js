module.exports = async (Discord, client, message) => {
    if(!message.content) return
client.snipes.push({
    channel: message.channel,
    content: message.content,
    author: message.author,
    image: message.attachments,
    date: new Date(),
  });
};