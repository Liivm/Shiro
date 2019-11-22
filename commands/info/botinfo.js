const { RichEmbed } = require("discord.js");

module.exports = {
    name: "botinfo",
    alias: ["info"],
    category: "info",
    description: "Returns information about the bot",
    usage: "botinfo",
    run: async (client, message, args) => {
        const bicon = client.user.displayAvatarURL;

        const embedMsg = new RichEmbed()
            .setDescription("Bot information")
            .setColor("#0b7ed6")
            .setThumbnail(bicon)
            .addField("Bot name", client.user.username)
            .addField("My owner", "TundraBuddy#4650")
            .addField("Created at", client.user.createdAt);

        return message.channel.send(embedMsg);
    }
};