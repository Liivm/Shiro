const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = async (client, message) => {
    if (message.author.bot) return;  // if a bot sent the message

    /*
    // Will Sniper
    if(message.author.id === "94164958056558592") {
        if(message.attachments && !message.content) {
            const sentMessage = await message.channel.send("POST THE DAMN SOURCE REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            sentMessage.pin();
        }
    }
    */
    /*
    // Josh Sniper
    if(message.author.id === "114848659891290118") {
        if(message.attachments && !message.content) {
            const sentMessage = await message.channel.send("@everyone POST THE DAMN SOURCE REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            sentMessage.pin();
        }
    }
    */

    // If the message was not sent in a server
    if (!message.guild) {
        const owner = await client.users.fetch(process.env.OWNERID);
        const messageAuthor = message.author;
        const messageContent = message.content;
        const messageAttachments = message.attachments;

        const embedMsg = new MessageEmbed()
            .setColor("#0d6adb")
            .setTimestamp(message.createdAt)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setDescription("Attempted DM")
            .addField("User information", stripIndents`**\\> ID:** ${message.author.id}
            **\\> Username:** ${message.author.username}
            **\\> Discord Tag:** ${message.author.tag}
            **\\> Created account:** ${formatDate(message.author.createdAt)}`, true);

        if (messageContent) {    // If there is text in the DM
            embedMsg.addField("Text:", messageContent)
        }
        if (messageAttachments.first()) { // If there is an attachment in the DM
            messageAttachments.forEach(attachment => {
                embedMsg.addField("Attachment:", attachment.url);
            });
            embedMsg.setImage(messageAttachments.first().url);
            /*
            let attachments = messageAttachments.find(attachment => attachment.id).url;

            embedMsg.addField("Attachments:", attachments)
            embedMsg.setImage(attachments);
            */
        }

        owner.send(embedMsg);

        return message.channel.send("Message my master TundraBuddy#4650 instead!");
    }
    // Sent in a guild
    if (!message.content.startsWith(process.env.PREFIX)) return; // if the message did not contain the command prefix
    if (!message.member) message.member = await message.guild.members.fetch(message.member);

    // If we are waiting on a response from this member, skip the regular command handler
    if (client.waitingResponse.has(message.author.id)) return;

    const messageArray = message.content.split(" ");
    const cmd = messageArray[0].slice(process.env.PREFIX.length).toLowerCase();
    const args = messageArray.slice(1);

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd); // Set the command to call
    if (!command) command = client.commands.get(client.aliases.get(cmd));    // If the command was not found, check aliases

    if (command) {
        try {
            command.run(client, message, args);
        } catch (err) {
            console.error("Error running command: ", err);
        }
    }
};