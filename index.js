const token = "your token here";
const keep_alive = require('./keep_alive.js');

//Installing dependencies--------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');

//Constants------------------------------------------------------------
const version = "v1.2";
const colour = '#0099ff';
const footer = "Auto Greg Bot " + version + " | Prag's Pog Squad";

//On start up -------------------------------------
client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

//Reading general.json and reading prefix, GregChannel, and GregID:
const files = fs.readdirSync("./JSONs");
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
  	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  //Creating command arguments
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();



  if(msg.content.startsWith(prefix + "bug")) {
    client.commands.get('bug').execute(msg, args);
  }
  else if(command === "greg") {
    client.commands.get('greg').execute(msg, args, typicalEmbed, colour, footer);
  } 
  else if(msg.content.startsWith(prefix + "gregsetup")) {
    client.commands.get('gregsetup').execute(msg, args, typicalEmbed, colour, footer);
  }
  else if(msg.content.startsWith(prefix + "hpybd")) {
    client.commands.get('hpybd').execute(msg, args);
  }
  else if(msg.content.startsWith(prefix + "setprefix")) {
    client.commands.get('setprefix').execute(msg, args);
  }
  else if(msg.content.startsWith(prefix + "updates")) {
    client.commands.get('updates').execute(msg, args, typicalEmbed, colour, footer, version);
  }
  else if(msg.content.startsWith(prefix + "verify")) {
    client.commands.get('verify').execute(msg, args, typicalEmbed, colour, footer);
  }



  //#greg spam auto function
  if(msg.channel.id == "729325685738438686") {
    if(GregChannel != null && GregID != null) {
      if(msg.author.id !== client.user.id) { 
        client.channels.cache.get(GregChannel).send(GregID);
        //The above is obtained by typing (in discord) "\:emojiname:"
      }
    } else {
      if(msg.author.id !== client.user.id) {
        const GregErrDesc = "Get an admin to do the following:\n1) type `<\:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>] [Channel ID you want to spam]`.\nAnd you're good to go!";
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
    msg.channel.send("Goooood morning Vietnaaaaaam! Greg has blessed you with a good day, <@" + msg.author.id + ">!")
  }

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
