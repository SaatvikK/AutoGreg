module.exports = {
  name: 'setup',
  description: 'This command will show you how to properly set up every aspect of the bot.',
  execute(msg, args, typicalEmbed, colour, footer) {
    const SetupDesc = "`/gregsetup help` - Gives you help on how to set up the greg auto spam function.\n`/setprefix help` - Gives you help on how to set a new prefix.\n";
    try {
      msg.channel.send(typicalEmbed(SetupDesc, "Dyamically Setting up the bot", footer, colour));
    } catch(e) {
      msg.channel.send("Unable to send trivia question due to an internal error (or Discord fucked up). - Check console for error.");
      console.log("Command: trivia\nError: " + e);
    }
  },
};
