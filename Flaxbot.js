// These are required. Requires the user to have the discord.js installed
const Discord = require("discord.js");
// Creates an instance of Discord Client object
const bot = new Discord.Client();



bot.on('ready', () => {
    console.log("Connected as " + bot.user.tag)
    bot.user.setActivity("Spying on fleshlings", {type: "WATCHING"})
    bot.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.type} ${channel.name} ${channel.id}`)
        })
        // Seeder-test channel ID - 757194564053368904

    })
        // Seeder Role ID = 757561720720982058

})



//The various commands
bot.on("message", (message) => {
    let seeder_role_id = "757561720720982058"
    let channel = bot.channels.cache.find(channel => channel.name === "seeders-test");
    if(message.content == "!ping") {
        message.reply("pong");
    } else if(message.content == "!seedstartmsg") {
        console.log(channel)
        channel.send(`<@&${seeder_role_id}> Help always appreciated - blah blah`);
    } else if(message.content == "!help") {
        let commands = [" !ping ", " !seedstartmsg "]
        message.reply("Available commands are: " + commands)
    }
});






// The bot login token 
bot.login("NzU3MTE0MDIxMTMxMzIxNDE1.X2brYQ.Z3Pakm5a2crpy71yJYYC4crNQD8")

