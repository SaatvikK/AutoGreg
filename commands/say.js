module.exports = {
	name: 'say',
	description: 'Only for staff, allows staff to say shit using bot.',
	execute(msg, args, client) {
    if(msg.member.roles.cache.has('727485641541287946') == true || msg.member.roles.cache.has('785441338065551371') == true) {
      try { 
        if(args[0] == "help") {
          msg.channel.send("Correct usage: `/say [tag channel] [message]`");
        } else {
          let SendMsg = "";
          for(let i = 1; i < args.length; i++) {
            SendMsg = SendMsg + " " + args[i];
          }
          console.log(SendMsg);
          try {
            client.channels.cache.get(msg.mentions.channels.first().id).send(SendMsg);
          } catch(e) {
            msg.channel.send("Correct usage: `/say [tag channel] [message]`");
          }
        }
      } catch(e) {
          msg.channel.send("Error either with getting message or displaying help message.");
          console.log(e);
      }
    }
  },
}
