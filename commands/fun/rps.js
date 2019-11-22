const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

const ROCK = "⛰️";
const PAPER = "📰";
const SCISSORS = "✂️";
const emojiArray = [ROCK, PAPER, SCISSORS];

module.exports = {
    name: "rps",
    category: "fun",
    description: "Rock paper scissors game. React to one of the emojis to play.",
    usage: "rps",
    run: async (client, message, args) => {
        const embedMsg = new RichEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("React to one of these emojis to play the game!")
            .setTimestamp();

        const msg = await message.channel.send(embedMsg);
        const reacted = await promptMessage(msg, message.author, 30, emojiArray)

        const botChoice = emojiArray[Math.round(Math.random() * emojiArray.length)];

        const result = await getResult(reacted, botChoice);
        await msg.clearReactions();

        embedMsg
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`)

        msg.edit(embedMsg);
    }
};

function getResult(me, botChosen) {
    // User wins
    if((me === ROCK && botChosen === SCISSORS) ||
        (me === PAPER && botChosen === ROCK) ||
        (me === SCISSORS && botChosen === PAPER)) {
            return "You won!";
        } else if(me === botChosen) {
            return "It's a tie!";
        } else {
            return "You lost!";
        }
}