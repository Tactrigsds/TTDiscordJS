// These are required. Requires the user to have the discord.js installed
const Discord = require("discord.js");
// Creates an instance of Discord Client object
const bot = new Discord.Client();
var seedChannelId = "757194564053368904"
var seederRoleId = "757561720720982058"
var seedReactionEmojiID = "757691967672025171"




bot.on('ready', () => {
    console.log("Connected as " + bot.user.tag)
    //Don't need this, shows a specified status to the bot that will show up when you click it in Discord
    bot.user.setActivity("fleshlings", {type: "WATCHING"})
    bot.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.type} ${channel.name} ${channel.id}`)
        })
        // Seeder-test channel ID - 757194564053368904

    })
        // Seeder Role ID = 757561720720982058
})

//The various commands are defined here. Not a very good implementation
bot.on("message", (message) => {
    let channel = bot.channels.cache.find(channel => channel.name === "seeders-test")
    let input = message.content
    if(input == "!ping") {
        message.reply("pong");
    } else if(input == "!seedstartmsg") {
        console.log("detected input in: " + channel)
        channel.send(`<@&${seederRoleId}> Help always appreciated - blah blah`);
    } else if(input == "!help") {
        let commands = [" !ping ", " !seedstartmsg "]
        message.reply("Available commands are: " + commands)
    }
});

// The bot executes this when a reaction to any message is detected
bot.on("messageReactionAdd", async (reaction, user) => {
    let channel = bot.channels.cache.find(channel => channel.name === "seeders-test")
    if (reaction.partial){
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("something went wrong when fetching the message: ", error)
            return;
        }
    }
    // Here is where the main logic starts. Checks if the reaction happens in the correct channel before executing.-
    let emoji = reaction.emoji.name;
    if (channel == ":seed:");
        if (emoji == seedReactionEmojiID);
            let serverMember = reaction.message.guild.members.cache.get(user.id);
            let role = reaction.message.guild.roles.cache.get(seederRoleId);
            serverMember.roles.add(role);
            //channel.send(user.name + " have been added to the seeder role")
            channel.send(reaction.message.guild.members.cache.get(user.name) + " has been added to the seeder role")
    console.log("This is the reaction emoji: " + emoji)
});


bot.on("messageReactionRemove", async (reaction, user) => {
    let channel = bot.channels.cache.find(channel => channel.name === "seeders-test")
    if (reaction.partial){
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("something went wrong when fetching the message: ", error)
            return;
        }
    }
    let emoji = reaction.emoji.name;
    if (channel === ":seed:" && emoji === seedReactionEmojiID);
        let serverMember = reaction.message.guild.members.cache.get(user.id);
        let role = reaction.message.guild.roles.cache.get(seederRoleId);
        serverMember.roles.remove(role);
        channel.send(reaction.message.guild.members.cache.get(user.name) + " have been removed from the seeder role")
    console.log("This is the reaction emoji: " + emoji)
});



// The bot login token. Used to authenticate the bot in Discord
bot.login("NzU3MTE0MDIxMTMxMzIxNDE1.X2brYQ.Z3Pakm5a2crpy71yJYYC4crNQD8")
