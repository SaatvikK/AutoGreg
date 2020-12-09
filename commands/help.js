module.exports = {
  name: 'help',
  description: 'List of all the commands the bot can do.',
  aliases: ['commands'],
  usage: '[command name]',
  execute(msg, args, prefix, typicalEmbed, colour, footer) {
    const HelpDesc = prefix + " - prefix\n`/setprefix [new prefix]` - Admins only. Sets the prefix.\n`/greg` - Tells you info about greg.\n`/gregsetup [GregID] [GregChannelID]` - Only for admins, sets up the greg reaction function.\n`/hpybd` - Wishes <@234347441363746816> happy birthday.\n`/updates` - Newest updates and the current stable version.\n- `/bug [bug reason]` - Report an issue with the bot to the dev(s).";
    msg.channel.send(typicalEmbed(HelpDesc, "Help & Info", footer, colour));

  },
};
