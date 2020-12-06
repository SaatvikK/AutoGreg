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
let prefix = data["Prefix"];

let GregChannel = data["GregChannel"];
let GregID = data["GregID"];
client.on('message', msg => {
  //Creating command arguments -------------------------------------------------------------------------------------
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if(msg.member.roles.cache.has('775072572487630908') == true) { //While bot is in early stages, dont want unauthorized ppl using it.
    
    if(msg.content.startsWith(prefix + "setprefix")) {
      prefix = args[0]
      msg.channel.send("Your prefix has been set to: " + args[0]);
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



    if(GregChannel != null && GregID != null) {
      if(msg.author.id !== client.user.id) { 
        client.channels.cache.get(GregChannel).send(GregID);
        //The above is obtained by typing (in discord) "\:emojiname:"
      }
    } else {
      const GregErrDesc = "1) type `<\:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>] [Channel ID you want to spam]`.\nAnd you're good to go!";
      msg.channel.send(typicalEmbed(GregErrDesc, "Setting up the Greg spam function", footer, colour));
    }

    if(msg.content.startsWith(prefix + "gregsetup")) {
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


function gregReactionSetup() {

}
client.login(token);
