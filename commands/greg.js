module.exports = {
	name: 'greg',
	description: 'Gives you information about Greg.',
	execute(msg, args, typicalEmbed, colour, footer) {
    try {
      const GregDesc = "GREG is a user in this server that Prag (and most people with the Feeeshing Squad role) know IRL. GREG is a god and basically a meme on the server.\nYou can ask GREG questions in <#737657113618415627> and spam anything GREG in <#729325685738438686>!\n\n\nGREG is the person on Prag's starting soon screen :)\nHe has his own role so you can easily identify him.";
      msg.channel.send(typicalEmbed(GregDesc, "G R E G", footer, colour));
    } catch(e) {
      msg.channel.send("Unable to send trivia question due to an internal error (or Discord fucked up). - Check console for error.");
      console.log("Command: trivia\nError: " + e);
    }
  },
};
