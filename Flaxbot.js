// These are required. Requires the user to have the discord.js installed
const Discord = require("discord.js");
// Creates an instance of Discord Client object
const bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
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
bot.on("message", async (message) => {
    let seedChannel = bot.channels.cache.find(seedChannel => channel.name === "seeders-test")
    let input = message.content
    try {
        await message.fetch();
    } catch (error) {
        console.error("something went wrong when fetching the message: ", error)
        return;

    } switch(input) {
        case "ping":
        message.channel.send("pong");
        break;

        case "!seedstartmsg":
        console.log("detected input in: " + channel)
        seedChannel.send(`<@&${seederRoleId}> Time for seeding, help always appreciated, AFK or otherwise !`);
        break;

        case "!help":
        let commands = [" ping "," seedstartmsg "]
        message.channel.send("Available commands are: " + commands)
        break;

        case "!clear":
        let channel = message.channel
        let messageManager = channel.messages
        messageManager.fetch( {limit: 100} ).then((messages) => {
            messages.forEach((message) => {
                if (!message.pinned){   
                message.delete();}
        break;
            })
        })
    };
});

// The bot executes this when a reaction to any message is detected
bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("something went wrong when fetching the message: ", error)
            return;
        }
    }
    // Here is where the main logic starts. Checks if the reaction happens in the correct channel before executing.
    let emoji = reaction.emoji.id;
    if (emoji === seedReactionEmojiID && reaction.message.channel.name === "seeders-test") {
        let serverMember = reaction.message.guild.members.cache.get(user.id);
        let role = reaction.message.guild.roles.cache.get(seederRoleId);
        serverMember.roles.add(role);
        reaction.message.channel.send(user.username + " has been added to the seeder role")
    } console.log(`This is the reaction emoji: ${emoji.id}`)
});


bot.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.partial){ // This lets the bot read previous messages, rather than only messages posted after it joined the server
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("something went wrong when fetching the message: ", error)
            return;
        };
    };
    let emoji = reaction.emoji.id;
    if (reaction.message.channel.name === "seeders-test" && emoji === seedReactionEmojiID) {
        let serverMember = reaction.message.guild.members.cache.get(user.id);
        let role = reaction.message.guild.roles.cache.get(seederRoleId);
        serverMember.roles.remove(role);
        reaction.message.channel.send(user.username + " have been removed from the seeder role")
    }; console.log(`This is the reaction emoji: ${emoji.id}`)
});



// The bot login token. Used to authenticate the bot in Discord
bot.login("NzU3MTE0MDIxMTMxMzIxNDE1.X2brYQ.Z3Pakm5a2crpy71yJYYC4crNQD8")