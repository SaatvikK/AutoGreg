const token = "your token here";
//const keep_alive = require('./keep_alive.js');

//const keep_alive = require('./keep_alive.js');

//Installing dependencies--------------------------------------
let Discord = null;
let fs = null;
let path = null;
try {
  Discord = require('discord.js');
  fs = require('fs');
  path = require('path');
} catch(e) {
  console.log("Unable to install some dependencies. Attempted to install:\nDiscord.js\nfs\npath.\nError:\n" + e);
}
//Constants------------------------------------------------------------
const client = new Discord.Client();
const version = "v2.0";
const colour = '#0099ff';
const footer = "Auto Greg Bot " + version + " | Prag's Pog Squad";

//On start up -------------------------------------
client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

//Reading general.json and reading prefix, GregChannel, and GregID:
const data = JSON.parse(fs.readFileSync("./JSONs/general.json", "utf8"));
let prefix = data["Prefix"];

let GregChannel = data["GregChannel"];
let GregID = data["GregID"];

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

//On message sent event ------------------------------------------
client.on('message', msg => {
  msg.content = msg.content.toLowerCase();
  //Creating command arguments
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


  try {
    if(msg.content.startsWith(prefix + "bug")) {
      client.commands.get('bug').execute(msg, args, client.channels.cache.get("785116447852068875"));
    }
    else if(command === "greg") {
      client.commands.get('greg').execute(msg, args, typicalEmbed, colour, footer);
    } 
    else if(msg.content.startsWith(prefix + "gregsetup")) {
      client.commands.get('gregsetup').execute(msg, args, typicalEmbed, colour, footer, prefix, fs);
    }
    else if(msg.content.startsWith(prefix + "hpybd")) {
      client.commands.get('hpybd').execute(msg, args);
    }
    else if(msg.content.startsWith(prefix + "setprefix")) {
      client.commands.get('setprefix').execute(msg, args, GregChannel, GregID, fs);
      prefix = args[0];
    }
    else if(command === "updates") {
      client.commands.get('updates').execute(msg, args, typicalEmbed, colour, footer, version);
    }
    else if(command === "help") {
      client.commands.get('help').execute(msg, args, prefix, typicalEmbed, colour, footer);
    }
    else if(command === "setup") {
      client.commands.get('setup').execute(msg, args, typicalEmbed, colour, footer);
    }
    else if(command === "say") {
      try {
        const SendChnl = client.channels.cache.get(msg.mentions.channels.first().id);
        client.commands.get('say').execute(msg, args, SendChnl);
      } catch(e) {
        console.log("Had trouble getting channel to send msg to. Probably because /say help was triggered. Error:\n" + e);
        client.commands.get('say').execute(msg, args);
      }
    }
    else if(command === "l") {
      client.commands.get('l').execute(msg, args);
    }
    else if(command === "trivia") {
      client.commands.get('trivia').execute(msg, args, typicalEmbed, colour, footer);
    }
    else if(command === "r" || command === "rule") {
      client.commands.get("rules").execute(msg, args, typicalEmbed, colour, footer, prefix, fs);
    } else {
      //#greg spam auto function
      if(msg.channel.id == "729325685738438686") {
        if(GregChannel != null && GregID != null) {
          if(msg.author.id !== client.user.id) { 
            client.channels.cache.get(GregChannel).send(GregID);
            //The above is obtained by typing (in discord) "\:emojiname:"
          }
        } else {
          if(msg.author.id !== client.user.id) {
            const GregErrDesc = "Get an admin to do the following:\n1) type `[backslash here]:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>] [Channel ID you want to spam]`.\nAnd you're good to go!";
            msg.channel.send(typicalEmbed(GregErrDesc, "Setting up the Greg spam function", footer, colour));
          }
        }
      }

      //Greg setup
      try {
        if(msg.member.roles.cache.has('626845823690604571') == true) {
          if(msg.content.startsWith(prefix + "gregsetup")) {
            
          }
        }
      } catch(e) {}

      //Good morning auto responder
      if(msg.content.startsWith("good morning") || msg.content.startsWith("gm")) {
        //msg.channel.send("Goooood morning Vietnaaaaaam! Greg has blessed you with a good day, <@" + msg.author.id + ">!")
      }
    }
  } catch(e) {
    msg.channel.send("Had trouble processing your request. Please try again. If the issue persists send a bug report with `/bug [bug]` or contact a staff member.");
  }

  const PingChannels = ["651551662892122112", "651551636719665171", "694981465972277369"] //0: announcements, 1: vids, 2: streams <-- for ACTUAL bot
  try {
    //const PingChannels = ["784139162081165352"]; // For unstable version.
    if(PingChannels.includes(msg.channel.id) && msg.mentions) { //<:pingsock:781164489600532522>
      msg.react("<:Pingsock:706831123568656416>");
    }
  } catch(e) {}
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
