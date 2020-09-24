const { MessageEmbed } = require("discord.js");
const { createChannel, formatDateLong } = require("../functions.js");

module.exports = async (client, member) => {
    const guild = member.guild;
    const micon = member.user.displayAvatarURL();

    const embedMsg = new MessageEmbed()
        .setDescription(`${member.user.username} joined the server`)
        .setColor("GREEN")
        .setThumbnail(micon)
        .addField(`${member.user.username} joined`, `${formatDateLong(member.joinedAt)} EST`)
        .addField("New total members", guild.memberCount)
        .setTimestamp();

    // Log activity and create channel if necessary
    if (!member.guild.channels.cache.some(channel => channel.name === settings.logChannel)) {
        if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
            // TODO: send message in #general?
            //message.channel.send("I couldn't send the log to the correct channel and I don't have permissions to create it.");
        } else {
            await createChannel(member.guild, settings.logChannel, [{
                id: member.guild.id,
                deny: ["VIEW_CHANNEL"],
            }, {
                id: client.user.id,
                allow: ["VIEW_CHANNEL"]
            }]).then(() => {
                const logChannel = member.guild.channels.cache.find(channel => channel.name === settings.logChannel);

                return logChannel.send(embedMsg);
            })
                .catch(err => {
                    console.error("guildMemberAdd event error: ", err);
                });
        }
    } else { // Channel already exists
        const logChannel = member.guild.channels.cache.find(channel => channel.name === settings.logChannel);

        return logChannel.send(embedMsg);
    }
};