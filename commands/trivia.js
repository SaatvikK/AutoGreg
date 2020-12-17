module.exports = {
  name: 'trivia',
  description: 'Prageegee trivia.',
  execute(msg, args, typicalEmbed, colour, footer) {
    const questions = ["Why did Prageegee not do a face reveal at 1k subs on YT?", 
                      "What was Prageegee's FIRST youtube name?", 
                      "What joke school does Prageegee go to?", 
                      "What is Prageegee's most disliked video?", 
                      "Prageegee's favourite game?",
                      "How many Ultimate Fishing Guide videos will there be until it ends?",
                      "Is Prageegee's favourite game mode UHC?",
                      "Who were the founding members of the Pog Squad?",
                      "What is Prageegee's least favourite fruit?",
                      "What is Prageegee's favourite fruit?"];
    const answers = ["Earlier that year, he'd been sub botted (we suspect), but he didn't know. Just when he hit 1k subs, the sub bots disappeared and he went down to 965 subs lmaoooo. So he loopholed his promise and made up som bs and didn't do the face reveal :(", 
                    "KingPrageegee", "Okham", "Hytale's gonna be trash", 
                    "Super Mario Galaxy 1",
                    "They will never end",
                    "No, he hates it",
                    "Will, Tom, Billing, and Prageegee",
                    "Bananas",
                    "Mangos"];
    const TriviaIndex = Math.floor(Math.random() * questions.length);
    desc = "Question: **" + questions[TriviaIndex] + "**\nAnswer: ||" + answers[TriviaIndex] + "||.";
    try {
      msg.channel.send("<@" + msg.author.id + "> Here:\n");
      msg.channel.send(typicalEmbed(desc, "Prageegee Trivia", footer, colour));
    } catch(e) {
      msg.channel.send("Unable to send trivia question due to an internal error (or Discord fucked up). - Check console for error.");
      console.log("Command: trivia\nError: " + e);
    }
  },
};
