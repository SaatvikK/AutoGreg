module.exports = {
	name: 'updates',
	description: 'The update log of the most recent stable release of the bot.',
	execute(msg, args, typicalEmbed, colour, footer, version) {
    const UpdateDesc = "- Optimized code: https://discordjs.guide/command-handling/";
    msg.channel.send(typicalEmbed(UpdateDesc, "Auto Greg: " + version + " Update Log", footer, colour));
  },
};
