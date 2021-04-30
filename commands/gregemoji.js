const MongoClient = require('mongodb').MongoClient;
module.exports = {
	name: 'gregemoji',
	description: 'Setting up the emoji GREG spam function. (Admins only!)',
	execute(msg, args, colour, footer, uri) {
    //Putting gregID and GregChannel in the JSON for saving
    if(!args.length) return msg.channel.send(
                              {
                                embed: {
                                  color: colour,
                                  description: "This command will set up the greg spam function. This basically means that whenever **ANY** message is sent in the channel of your choice, I'll send 1 emoji of your choice.\n\n\n**Get an admin to do the following:**\n1) type `[backslash here]:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>]`.\nAnd you're good to go!",
                                  timestamp: new Date(),
                                  footer: {
                                    text: footer
                                  }
                                }
                              }
                            );
    async function queryDB(msg, args, uri, channel) {
      console.log("async fcuntion")
      const database = new MongoClient(uri, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      });
      try {
        await database.connect();
        const TriviaCollection = await database.db("PogSquad").collection("greg");
        const sort = { length: -1 };

        const result = await TriviaCollection.findOne({"Identifier":2});
        console.log(result);

        if(result != null) {
          const MyQuery = {"Identifier": 2};
          const NewQuery = { $set: {"Identifier": 2, "GregID": channel}};
          const res = await TriviaCollection.updateOne(MyQuery, NewQuery);
          msg.channel.send("Changed GREG emoji to:");
          msg.channel.send(channel);
          return;            
        } else {
          const doc = {"Identifier": 2, "GregID": channel};
          const InsertDoc = await TriviaCollection.insertOne(doc);
          msg.channel.send("Changed GREG emoji to:");
          msg.channel.send(channel);
          return;    
        }    
      } catch(e) {
        msg.channel.send("Error while changing greg emoji. Full error in console.");
        console.log("Error while adding trivia points via addtrivia:");
        console.log(e);
      } finally { database.close(); } 

      msg.channel.send("Changed GREG emoji to:");
      msg.channel.send(channel);
    }

    queryDB(msg, args, uri, args[0]).catch(console.dir);
  },
};
