module.exports = {
	name: 'updates',
	description: 'The update log of the most recent stable release of the bot.',
	execute(msg, args, typicalEmbed, colour, footer, version) {
    try {
      const UpdateDesc = "- Fixed bug where some commands could be triggered with any prefix (was annoying when talking in chat).\n";
      msg.channel.send(typicalEmbed(UpdateDesc, "Auto Greg: " + version + " Update Log", footer, colour));
    } catch(e) {
      msg.channel.send("Unable to send trivia question due to an internal error (or Discord fucked up). - Check console for error.");
      console.log("Command: trivia\nError: " + e);
    }
  },
};
