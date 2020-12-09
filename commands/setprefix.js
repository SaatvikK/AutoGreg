module.exports = {
	name: 'setprefix',
	description: 'Sets the prefix for the server. (Admins only!)',
	execute(msg, args, GregChannel, GregID, fs) {
    //Saving prefix to JSON.
    msg.channel.send("Your prefix has been set to: " + args[0]);
    let TempDict = {
      "Prefix": args[0],
      "GregChannel": GregChannel,
      "GregID": GregID
    };
    let jsonDATA = JSON.stringify(TempDict);
    fs.writeFile("./JSONs/general.json", jsonDATA, function(err) { //function(err) is the callback function
      if(err) {
        msg.channel.send(err);
      }
    });
	},
};
