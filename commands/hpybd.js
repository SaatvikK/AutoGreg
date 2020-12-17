module.exports = {
	name: 'hpybd',
	description: 'Wishes Rivalone a happybirthday.',
	execute(msg, args) {
		try {
			msg.channel.send("Happy birthday Rival!!");
		} catch(e) {
      msg.channel.send("Unable to send trivia question due to an internal error (or Discord fucked up). - Check console for error.");
      console.log("Command: trivia\nError: " + e);
    }
  },
};
