module.exports = {
	name: 'updates',
	description: 'The update log of the most recent stable release of the bot.',
	execute(msg, args, typicalEmbed, colour, footer, version) {
    const UpdateDesc = "- `/help` command.\n- `/greg` command\n- `/issue` - Issue report command.\n- Webserver (bot on 24/7)\n- Bot now autoresponds to goodmorning messages.\n- `/updates` -  Update log command.\n- `/verify` - Verify.\n- The bot will now only spam in <#729325685738438686> when someone sends a message there, to prevent overspam.\n";
    msg.channel.send(typicalEmbed(UpdateDesc, "Auto Greg: " + version + " Update Log", footer + " | " + GitRepo, colour));
  },
};