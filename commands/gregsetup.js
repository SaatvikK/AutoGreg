module.exports = {
	name: 'gregsetup',
	description: 'Setting up the emoji GREG spam function. (Admins only!)',
	execute(msg, args, typicalEmbed, colour, footer, prefix, fs) {
    //Putting gregID and GregChannel in the JSON for saving
    if(!args.length) return msg.channel.send(
                              {
                                embed: {
                                  color: colour,
                                  description: "This command will set up the greg spam function. This basically means that whenever **ANY** message is sent in the channel of your choice, I'll send 1 emoji of your choice.\n\n\n**Get an admin to do the following:**\n1) type `[backslash here]:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>] [Channel ID you want to spam]`.\nAnd you're good to go!",
                                  timestamp: new Date(),
                                  footer: {
                                    text: footer
                                  }
                                }
                              }
                            );

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

    //arg[1] - amount to give.
    async function queryDB(msg, args, uri) {
      console.log("async fcuntion")
      const database = new MongoClient(uri, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      });
      try {
        await database.connect();
        const TriviaCollection = await database.db("PogSquad").collection("greg");
        const sort = { length: -1 };

        const result = await TriviaCollection.findOne({"Identifier":1});
        console.log(result);

        if(result != null) {
          const MyQuery = {"Identifier": 1};
          const NewQuery = { $set: [{result["UserID"],"TriviaPoints": result["TriviaPoints"] + parseInt(args[1])}] };
          const res = await TriviaCollection.updateOne(MyQuery, NewQuery);
          msg.channel.send("Added points.")
          return;            
        } else {
          const doc = {"UserID": args[0],"TriviaPoints":parseInt(args[1])};
          const InsertDoc = await TriviaCollection.insertOne(doc);
          msg.channel.send("Created record for user and added points.");
          return;    
        }    
      } catch(e) {
        msg.channel.send("Error while adding point. Full error in console.");
        console.log("Error while adding trivia points via addtrivia:");
        console.log(e);
      } finally { database.close(); } 

    }