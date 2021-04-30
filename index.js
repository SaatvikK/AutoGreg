const token = process.env.DISCORD_BOT_SECRET;
const keep_alive = require('./keep_alive.js'); //This is the webserver to keep bot alive.

//Installing dependencies--------------------------------------
let Discord = null;
let fs = null;
let path = null;

try {
  Discord = require('discord.js');
  fs = require('fs');
  path = require('path');
  MongoClient = require('mongodb').MongoClient;
} catch(e) {
  console.log("Unable to install some dependencies. Attempted to install:\nDiscord.js\nfs\npath.\nMongoDB\nError:\n" + e);
}
//Constants------------------------------------------------------------
const client = new Discord.Client();
const version = "v3.0";
const colour = '#0099ff';
const footer = "Auto Greg Bot " + version + " | Prag's Pog Squad";

//Prefix Stuff
const data = JSON.parse(fs.readFileSync("./JSONs/general.json", "utf8"));
let prefix = data["Prefix"];

//MongoDB Stuff
const MongoUsername = process.env.MONGO_USERNAME;
const MongoPassword = process.env.MONGO_PASSWORD;
const uri = "mongodb+srv://" + MongoUsername + ":" + MongoPassword + "@testcluster.8mz1j.mongodb.net/BrooklynNineNine?retryWrites=true&w=majority";

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

//On start up -------------------------------------
client.on('ready', () => { //Executes when bot is initially started.
  console.log("I'm in");
  console.log(client.user.username);
}); 

//On message sent event ------------------------------------------
client.on('message', msg => {
  msg.content = msg.content.toLowerCase();
  //Creating command arguments
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if(msg.author.bot) return;
  try {
    switch(command) {
      case "bug":
        client.commands.get('bug').execute(msg, args, client.channels.cache.get("785116447852068875"));
      break;
      
      case "greg":
        client.commands.get('greg').execute(msg, args, typicalEmbed, colour, footer);
      break;
      
      case "gregchannel":
        if(msg.member.roles.cache.has('626845823690604571') == true) {
          client.commands.get('gregchannel').execute(msg, args, colour, footer, uri);
        }
      break;

      case "gregemoji":
        if(msg.member.roles.cache.has("626845823690604571") == true) {
          client.commands.get("gregemoji").execute(msg, args, colour, footer, uri);
        }
      break;
      case "hpybd":
        client.commands.get('hpybd').execute(msg, args);
      break;

      case "setprefix":
        client.commands.get('setprefix').execute(msg, args, GregChannel, GregID, fs);
        prefix = args[0];
      break;

      case "updates":
        client.commands.get('updates').execute(msg, args, typicalEmbed, colour, footer, version);
      break;

      case "help":
        client.commands.get('help').execute(msg, args, prefix, typicalEmbed, colour, footer);
      break;

      case "setup":
        client.commands.get('setup').execute(msg, args, typicalEmbed, colour, footer);
      break;

      case "say":
        client.commands.get('say').execute(msg, args, client);
      break;

      case "l":
        client.commands.get('l').execute(msg, args);
      break;

      case "trivia":
        client.commands.get('trivia').execute(msg, args, typicalEmbed, colour, footer);
      break;

      case "r":
      case "rule":
        client.commands.get("rules").execute(msg, args, typicalEmbed, colour, footer, prefix, fs);
      break;
      default:

        //#greg spam auto function
        async function dbStuff(msg, args, uri) {
          console.log("async fcuntion")
          const database = new MongoClient(uri, {
            userNewUrlParser: true,
            useUnifiedTopology: true,
          });

          try {
            await database.connect();
            const TriviaCollection = await database.db("PogSquad").collection("greg");
            const sort = { length: -1 };

            const channel = await TriviaCollection.findOne({"Identifier":1});
            const emoji = await TriviaCollection.findOne({"Identifier":2});
            console.log(channel);
            console.log(emoji)
            if(!msg.author.bot) {
              if(msg.channel.id == channel["GregChannelID"]) {
                if(channel["GregChannelID"] != null && emoji["GregID"] != null) {
                  return client.channels.cache.get(channel["GregChannelID"]).send(emoji["GregID"]);
                  //The above is obtained by typing (in discord) "\:emojiname:"         
                } else {
                  return msg.channel.send(typicalEmbed("Get an admin to do the following:\n1) type `[backslash here]:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>] [Channel ID you want to spam]`.\nAnd you're good to go!", "Setting up the Greg spam function", footer, colour));  
                }    
              }
            } else { return; }
          } catch(e) {
            msg.channel.send("Error while querying database for the GREG shit.");
            console.log("Error while adding trivia points via addtrivia:");
            console.log(e);
          } finally { database.close(); } 
        }
        dbStuff(msg, args, uri).catch(console.dir);
      break;
    }
  } catch(e) { msg.channel.send("Error processing your request."); console.log(e); }
});





//Embed function for general use.
function typicalEmbed(desc, title, footer, colour) {
  const Embed = new Discord.MessageEmbed()
  .setColor(colour)
  .setTitle(title)
  .setDescription(desc)
  .setTimestamp()
  .setFooter(footer);

  return Embed;
}


client.login(token); //Bot logging into Discord.
