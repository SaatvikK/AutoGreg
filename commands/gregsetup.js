module.exports = {
	name: 'gregsetup',
	description: 'Setting up the emoji GREG spam function. (Admins only!)',
	execute(msg, args, typicalEmbed, colour, footer) {
    //Putting gregID and GregChannel in the JSON for saving
    GregID = args[0];
    GregChannel = args[1];
    let TempDict = {
      "Prefix": prefix,
      "GregChannel": GregChannel,
      "GregID": GregID
    };
    let jsonDATA = JSON.stringify(TempDict);
    fs.writeFile("./JSONs/general.json", jsonDATA, function(err) { //function(err) is the callback function
      if(err) {
        msg.channel.send(err);
      }
    });

    msg.channel.send("All done! I'll now spam " + GregID + " in <#" + GregChannel + "> whenever someone sends a message!");
  },
};
