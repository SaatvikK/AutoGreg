module.exports = {
	name: 'verify',
	description: 'Gives you information about Greg.',
	execute(msg, args, typicalEmbed, colour, footer) {
    if(msg.member.roles.cache.has('645403792866803722') == true) {
      msg.member.roles.add(['586878256901259276']); //Adds members role
      msg.member.roles.remove('645403792866803722'); //Removes unverified role
      try {
        msg.author.send("You've been verified on Prag's Pog Squad! You should've been DMed by a bot called 'Carl-bot', please read that for info!"); //Dms user that verification is complete.
      } catch(e) {}
        client.channels.cache.get('586874484263354377').send("Verified user: <@" + msg.author.id + ">"); //Sends message in staff channel.
    } else {
      msg.channel.send("Error: you can't do that, because you're already verified, YIPEE!");
    }
  },
};
