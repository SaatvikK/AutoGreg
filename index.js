const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const fs = require('fs');


const colour = '#0099ff';
const footer = "Auto Greg Bot | Prag's Pog Squad"
client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on('message', msg => {
  prefix = "%";
  //Creating command arguments -------------------------------------------------------------------------------------
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if(msg.member.roles.cache.has('626845823690604571') == true) { //While bot is in early stages, dont want unauthorized ppl using it.
    if(msg.content.startsWith(prefix + "help")) {
      const HelpDesc = "% - prefix\n";
      const HelpEmbed = typicalEmbed(HelpDesc, "Help & Info", footer, colour);
      msg.channel.send(HelpEmbed)
    }
  }





  function typicalEmbed(desc, title, footer, colour) {
    const Embed = new Discord.MessageEmbed()
    .setColor(colour)
    .setTitle(title)
    .setDescription(desc)
    .setTimestamp()
    .setFooter(footer);

    return Embed;
  }
});

client.login(token);