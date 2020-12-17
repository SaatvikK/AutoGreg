module.exports = {
	name: 'l',
	description: 'L, Prageegee!',
	execute(msg, args) {
		try {
			msg.channel.send("L, Prageegee.");
		} catch(e) {
      msg.channel.send("Unable to send trivia question due to an internal error (or Discord fucked up). - Check console for error.");
      console.log("Command: trivia\nError: " + e);
    }
  },
};
