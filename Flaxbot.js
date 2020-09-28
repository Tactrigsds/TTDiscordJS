// These are required. Requires the user to have the discord.js installed
const Discord = require("discord.js");
// Creates an instance of Discord Client object
const bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
var startInterval = 975 // The earliest time the will execute at, measured in minutes from midnight. Currently set at 14:00 UTC. Should be specified in UTC
var endInterval = 985 // The latest time it will start at, measured in minutes from midnight. Currently set at 14:10 UTC. Should be specified in UTC
// var seedChannelId = "757194564053368904"
var seederRoleId = "757561720720982058"
var seedReactionEmojiID = "757691967672025171"
let channelIDS = ["757194564053368904"] // The channels that the emojis will work in
let seedMsgOn = true


bot.on('ready', () => {
    console.log("Connected as " + bot.user.tag)
    // Don't need this, just for testing purposes
    bot.user.setActivity("fleshlings", {type: "WATCHING"})
    bot.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.type} ${channel.name} ${channel.id}`)
        })
    })

    // Checks if it's the desired time interval every 10 minutes
    setInterval(execute, 60000);
})

//The various commands are defined here. Not a very good implementation
bot.on("message", async (message) => {
    let seedChannel = bot.channels.cache.find(channel => channel.name === "seeders-test")
    let input = message.content
    try {
        await message.fetch();
    } catch (error) {
        console.error("something went wrong when fetching the message: ", error)
        return;

    } switch(input) {
        case "!seedstartmsg":
        seedChannel.send(`<@&${seederRoleId}> Time for seeding, help always appreciated, AFK or otherwise !`);
        break;

        case "!help":
        let commands = [" ping "," seedstartmsg ", "clear", "seedmsgstop", "seedmsgstart"]
        message.channel.send("Available commands are: " + commands)
        break;

        case "!clear":
        let messageManager = message.channel.messages
        messageManager.fetch( {limit: 100} ).then(fetched => {
            let notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned)
            message.channel.bulkDelete(notPinned, true) })
        break;

        case "!seedmsgstop":
        seedMsgOn = false
        message.channel.send("The periodic seed message has been stopped")
        break;

        case "!seedmsgstart":
        seedMsgOn = true
        message.channel.send("The periodic seed message has been restarted")
        break;
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
    if (emoji === seedReactionEmojiID && channelIDS.includes(reaction.message.channel.id)) {
        let serverMember = reaction.message.guild.members.cache.get(user.id);
        let role = reaction.message.guild.roles.cache.get(seederRoleId);
        serverMember.roles.add(role);
        reaction.message.channel.send(`the user ${user.username} has been added to the seeder role`)
    } 
    console.log(`This is the reaction emoji: ${reaction.emoji.id} ${reaction.emoji.name}`)
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
    if (emoji === seedReactionEmojiID && channelIDS.includes(reaction.message.channel.id)) {
        let serverMember = reaction.message.guild.members.cache.get(user.id);
        let role = reaction.message.guild.roles.cache.get(seederRoleId);
        serverMember.roles.remove(role);
        reaction.message.channel.send(user.username + " has been removed from the seeder role")
    };
    console.log(`This is the reaction emoji: ${reaction.emoji.id} ${reaction.emoji.name}`)
});



// The bot login token. Used to authenticate the bot in Discord
bot.login("NzU3MTE0MDIxMTMxMzIxNDE1.X2brYQ.p1wCHr9Hr9IPfeY9wd98gGU7Jn0")

// Checks if it's the time is within the desired interval
function timeCheck (start, end) {
    let date = new Date();
    let time = date.getUTCHours() * 60 + date.getUTCMinutes()
    if (time >= start && time < end) {
        return true
    } else {
        return false;
    }
}

// Calls the timecheck function and checks if the time is in the correct interval, then executes 
function execute() {
    if (timeCheck(startInterval, endInterval)) {
        let seedChannel = bot.channels.cache.find(channel => channel.name === "seeders-test");
        seedChannel.send("!clear")
        console.log("Executed the clear and sent the seedmsg")
        if(seedMsgOn) {
            setTimeout(seedtime => {seedChannel.send(`<@&${seederRoleId}> Time for seeding, help always appreciated, AFK or otherwise !`)}
        , 3000) //delays the seed message by a few seconds to ensure it doesent get caught by the clear command
        }
    }
}