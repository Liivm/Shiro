/**
 * @param {import("discord.js").Client} client Discord Client instance
 * @param {import("discord.js").Invite} invite Discord guild Invite
*/
module.exports = async (client, invite) => {
    let settings;
    try {
        settings = await client.getGuild(invite.guild);
    } catch (err) {
        console.error("guildMemberAdd event error: ", err);
    }

    // Join messages are enabled and invite tracking is on
    if (settings.joinMessages.enabled && settings.joinMessages.inviteTracker) {
        let currentInvites = client.guildInvites.get(invite.guild.id);
        currentInvites.set(invite[0], invite[1]);
        client.guildInvites.set(invite.guild.id, currentInvites);
    }
}