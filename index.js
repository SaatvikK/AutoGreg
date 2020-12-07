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
const GitRepo = "Repo: https://github.com/SaatvikK/AutoGreg";

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

//On message sent event ------------------------------------------
client.on('message', msg => {
  msg.content = msg.content.toLowerCase();
  //Creating command arguments
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  //Setting prefix
  if(msg.content.startsWith(prefix + "setprefix")) {
    prefix = args[0]

    //Saving prefix to JSON.
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

  //Help command
  if(msg.content.startsWith(prefix + "help")) {
    const HelpDesc = prefix + " - prefix\n`/greg` - Tells you info about greg.\n`/gregsetup` - Only for admins, sets up the greg reaction function.\n`/hpybd` - Wishes <@234347441363746816> happy birthday.\n`/updates` - Newest updates and the current stable version.\n `/verify` - Only for unverified people.\n- `/issue` - Report an issue with the bot to the dev(s).";
    const HelpEmbed = typicalEmbed(HelpDesc, "Help & Info", footer, colour);
    msg.channel.send(HelpEmbed)
  }

  //Greg command
  if(msg.content.startsWith(prefix + "greg")) {
    const GregDesc = "GREG is a user in this server that Prag (and most people with the Feeeshing Squad role) know IRL. GREG is a god and basically a meme on the server.\nYou can ask GREG questions in <#737657113618415627> and spam anything GREG in <#729325685738438686>!\n\n\nGREG is the person on Prag's starting soon screen :)\nHe has his own role so you can easily identify him.";
    msg.channel.send(typicalEmbed(GregDesc, "G RE G", footer, colour));
  }

  //Issue command
  if(msg.content.startsWith(prefix + "issue")) {
    let Issue = "";
    for(let i = 0; i < args.length; i++) { //Gets message from the argument and puts in string.
      Issue = Issue + " " + args[i];
    }

    //Sending issue string 
    client.channels.cache.get("785116447852068875").send("<@397773303965548544>, new issue:\nFrom: <@" + msg.author.id + ">\nIssue: " + Issue);
    msg.channel.send("Your issue has been sent to the developer(s)!");
  }

  //#greg spam auto function
  if(GregChannel != null && GregID != null) {
    if(msg.author.id !== client.user.id && msg.channel.id == "729325685738438686") { 
      client.channels.cache.get(GregChannel).send(GregID);
      //The above is obtained by typing (in discord) "\:emojiname:"
    }
  } else {
    if(msg.author.id !== client.user.id) {
      const GregErrDesc = "Get an admin to do the following:\n1) type `<\:emojiname:` into discord.\n2) Copy the output you get (it should look something like: `<:GREG:784815940889346078>`).\n3) Type the following: `/gregsetup [<:emoji:emoji_id:>] [Channel ID you want to spam]`.\nAnd you're good to go!";
      msg.channel.send(typicalEmbed(GregErrDesc, "Setting up the Greg spam function", footer, colour));
    }
  }

  try {
    if(msg.member.roles.cache.has('626845823690604571') == true) {
      if(msg.content.startsWith(prefix + "gregsetup")) {
        //Putting gregID and GregChannel in the JSON for saving
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
  } catch(e) {
    console.log("");
  }
  //Happy birthday command
  if(msg.content.startsWith(prefix + "hpybd")) {
    msg.channel.send("Happy birthday Rival!!");
  }

  //Good morning auto responder
  if(msg.content.startsWith("good morning") || msg.content.startsWith("gm")) {
    msg.channel.send("Goooood morning Vietnaaaaaam! Greg has blessed you with a good day, <@" + msg.author.id + ">!")
  }

  //Update log
  if(msg.content.startsWith(prefix + "updates")) {
    const UpdateDesc = "- `/help` command.\n- `/greg` command\n- `/issue` - Issue report command.\n- Webserver (bot on 24/7)\n- Bot now autoresponds to goodmorning messages.\n- `/updates` -  Update log command.\n- `/verify` - Verify.\n- The bot will now only spam in <#729325685738438686> when someone sends a message there, to prevent overspam.\n";
    msg.channel.send(typicalEmbed(UpdateDesc, "Auto Greg: " + version + " Update Log", footer + " | " + GitRepo, colour));
  }

  //Verification
  if(msg.content.startsWith(prefix + "verify")) {
    if(msg.member.roles.cache.has('645403792866803722') == true) {
      msg.member.roles.add(['586878256901259276']); //Adds members role
      msg.member.roles.remove('645403792866803722'); //Removes unverified role
      msg.author.send("You've been verified on Prag's Pog Squad! You should've been DMed by a bot called 'Carl-bot', please read that for info!"); //Dms user that verification is complete.
      client.channels.cache.get('586874484263354377').send("Verified user: <@" + msg.author.id + ">"); //Sends message in staff channel.
    } else {
      msg.channel.send("Error: you can't do that, because you're already verified, YIPEE!");
    }
  } else {
    if(!msg.content && msg.author.id !== client.user.id) {
      msg.channel.send("Dumbfuck, thats not a command. do `/help` for a list of commands. ");
    }
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
