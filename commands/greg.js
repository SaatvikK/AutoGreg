module.exports = {
	name: 'gregsetup',
	description: 'Setting up the emoji GREG spam function. (Admins only!)',
	execute(msg, args, typicalEmbed, colour, footer, prefix, fs) {
    //Putting gregID and GregChannel in the JSON for saving
    if(args[0] == "help") {
      console.log("GU");
      const desc = "This command will set up the greg spam function. This basically means that whenever **ANY** message is sent in the channel of your choice, I'll send 1 emoji of your choice.\n\n\n**Get an admin to do the following:**\n1) type `[backslash here]:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>] [Channel ID you want to spam]`.\nAnd you're good to go!";
      msg.channel.send(typicalEmbed(desc, "How to set up the Greg Spam Function", footer, colour));
    } else {
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
    }
  },
};
