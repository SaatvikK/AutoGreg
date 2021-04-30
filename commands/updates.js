module.exports = {
	name: 'updates',
	description: 'The update log of the most recent stable release of the bot.',
	execute(msg, args, typicalEmbed, colour, footer, version) {
    try {
      const UpdateDesc = "- Increased efficiency when running commands.\n- Wired up bot to MongoDB, increases latency/ping a bit, but is much more reliable.";
      msg.channel.send(typicalEmbed(UpdateDesc, "Auto Greg: " + version + " Update Log", footer, colour));
    } catch(e) {
      msg.channel.send("Unable to send update log due to an internal error (or Discord fucked up). - Check console for error.");
      console.log("Command: Update Log\nError: " + e);
    }
  },
};
