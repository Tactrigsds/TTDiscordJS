// These are required. Requires the user to have the discord.js installed
const Discord = require("discord.js");
// Creates an instance of Discord Client object
const bot = new Discord.Client();




// The bot login token 
bot.login("NzU3MTE0MDIxMTMxMzIxNDE1.X2brYQ.Z3Pakm5a2crpy71yJYYC4crNQD8").then(() => {
    console.log("bot is ready");
    let seeder_role_id = "757561720720982058"
    let channel = bot.channels.cache.find(channel => channel.name === "seeders-test");
    channel.channels.cache.find().send(`<@&${seeder_role_id}> Help always appreciated - blah blah`).then(() => bot.destroy());
});