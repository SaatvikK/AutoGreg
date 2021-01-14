module.exports = {
	name: 'rules',
	description: 'Gives you the different rules. Usage: `/r 2`, eg: /r1 - gives you rule 1.',
	execute(msg, args, typicalEmbed, colour, footer, prefix, fs) {
    const rules = ["1) Don't spam ping people / spamming in chat or chat flood. **NO PINGING PEOPLE FOR STUPID OR NO REASON(S)**",
                   "2) No hating (e.g homophobia, sexism, racism, etc).",
                   "3) Don't annoy the staff. If they tell you something. listen to them.",
                   "4) **NSFW STUFF**\nMinor NSFW conversation is allowed on this server. **HOWEVER NO PICTURES OR VIDEOS ETC (eg: porn)**. No **excessive** NFSW conversations (use your brain with this one).",
                   "5) Linking any harmful material will be perm ban (I.e viruses, IP grabbers etc)",
                   "6) Swearing is allowed, check #announcements for banned words (pinned msg)",
                   "7)  Please use each channel for their specific purposes. Self promo goes #media, no where else.",
                   "9) Unnecessarily pinging Prageegee is prohibited (eg: pinging him to play games with you essentially everyday) unless you like have Feeeshing Club role or smth.",
                   "10) There is a 1 minute cooldown per person between uses of GIFs in the general channels.",
                   "11) NO POLITICS"];
    const RuleNums = ["1", "2", "3", "4", "5", "6", "7", "9", "10", "11"];
    //
    if(!args.length) return msg.channel.send("Correct usage: `/r [rule num]`, eg: `/r 2`. Also works with `/rule`");
    try {
      const index = parseInt(args[0]) - 1;
      const desc = rules[index];
      msg.channel.send(typicalEmbed(desc, "Rule " + args[0], footer, colour));
    } catch(e) {
      msg.channel.send("Either that isn't a rule, or I just errored.");
    }
  },
};
