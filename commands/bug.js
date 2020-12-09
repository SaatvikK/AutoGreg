module.exports = {
	name: 'bug',
	description: 'Send a bug to the developer! Be sure to include a message link!',
	execute(msg, args, chnl) {
    let Bug = "";
    for(let i = 0; i < args.length; i++) { //Gets message from the argument and puts in string.
      Bug = Bug + " " + args[i];
    }
    //Sending issue string 
    chnl.send("<@397773303965548544>, new issue:\nFrom: <@" + msg.author.id + ">\nBug: " + Bug);
    msg.channel.send("Your issue has been sent to the developer(s)!");
  },
};
