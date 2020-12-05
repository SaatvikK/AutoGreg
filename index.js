const token = "your token here";
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
const colour = '#0099ff';
const footer = "Auto Greg Bot | Prag's Pog Squad";
client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

const files = fs.readdirSync("./JSONs");
const data = JSON.parse(fs.readFileSync("./JSONs/general.json", "utf8"));
prefix = data["Prefix"];


client.on('message', msg => {
  //Creating command arguments -------------------------------------------------------------------------------------
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if(msg.member.roles.cache.has('775072572487630908') == true) { //While bot is in early stages, dont want unauthorized ppl using it.
    
    if(msg.content.startsWith(prefix + "setprefix")) {
      prefix = args[0]
      msg.channel.send("Your prefix has been set to: " + args[0]);
      let TempDict = {
        "Prefix": prefix
      };
      let jsonDATA = JSON.stringify(TempDict);
      fs.writeFile("./JSONs/general.json", jsonDATA, function(err) { //function(err) is the callback function
        if(err) {
          msg.channel.send(err);
        }
      });
    }
    if(msg.content.startsWith(prefix + "help")) {
      const HelpDesc = prefix + " - prefix\n";
      const HelpEmbed = typicalEmbed(HelpDesc, "Help & Info", footer, colour);
      msg.channel.send(HelpEmbed)
    }

    if(msg.content.startsWith(prefix + "greg")) {
      const GregDesc = "To be added later.";
      const GregEmbed = typicalEmbed(GregDesc, "G RE G", footer, colour);
    }

    if(msg.author.id !== client.user.id) { client.channels.cache.get('740160351668142091').send("\:GREG:"); }

  }
});

function typicalEmbed(desc, title, footer, colour) {
  const Embed = new Discord.MessageEmbed()
  .setColor(colour)
  .setTitle(title)
  .setDescription(desc)
  .setTimestamp()
  .setFooter(footer);

  return Embed;
}
client.login(token);
