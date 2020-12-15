module.exports = {
	name: 'say',
	description: 'Only for staff, allows staff to say shit using bot.',
	execute(msg, args, chnl) {
    if(msg.member.roles.cache.has('727485641541287946') == true) {
      try { 
        if(args[0] == "help") {
          msg.channel.send("Correct usage: `/say [tag channel] [message]`");
        } else {
          let SendMsg = "";
          for(let i = 1; i < args.length; i++) {
            SendMsg = SendMsg + " " + args[i];
          }
          try { 
            console.log(SendMsg);
            chnl.send(SendMsg);
          } catch(e) {
            console.log("Couldn't commit /say. Error:\n" + e)
          }
        }
      } catch(e) {
          msg.channel.send("Error either with getting message or displaying help message.");
          console.log(e)
      }
    }
  },
}
