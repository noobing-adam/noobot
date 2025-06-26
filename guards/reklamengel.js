const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async client => {
  client.on("messageCreate", async message => {
if(!message.guild) return;
if(!message.member) return;
if(!await db.get("reklamengel_" + message.guild.id)) return;
    let d = require("discord.js")
    let timeout = (id, süre, sebep) => {
      if(!id) return message.member.send("Bir id girin")
      if(!süre) return message.member.send("Bir süre girin.")
      if(!sebep) return message.member.send("Bir sebep girin.")
      let member = message.guild.members.cache.get(id)
      member.timeout(süre,sebep)
      
  }
const Embed = require("../tools/embed.js")
if(!await db.get("reklam_" + message.author.id)) db.set("reklam_" + message.author.id, 0) 
   let array =  [
        "discord.app",
        "discord.gg",
        "discordapp",
        "discord gg",
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        ".party",
        ".rf.gd",
        ".az",
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        ".rf",
        ".gd",
        ".az",
        ".party",
        ".gf",
        ".co",
        ".tc",
        ".cm",
        ".org",
        ".gq",
        ".ml",
        ".me",
        ".xyz",
        ".eu",
        ".ch",
        ".rf"
      ];
if(message.member.permissions.has("Administrator")) return
  if(!array.some(x => message.content.includes(x)) || message.author.bot) return
  let warns = await db.get("reklam_" + message.author.id) +1
message.member.send({ embeds: [Embed(`**${message.guild.name}** sunucusunda uyarıldın.`, `${message.author}, reklam yaptığın için bu sunucuda uyarıldın. Toplam \`${warns}\` kez reklam yapmışsın.`, "warn")]})  
message.delete()

   if(warns == 5) {
    
    timeout(message.author.id, 1800000, "5 kez reklam yapmak.")
    
} else if(warns == 10) {
   timeout(message.author.id, 3600000, "10 kez reklam yapmak.")
 } else if(warns == 20) {
   timeout(message.author.id, 7200000, "20 kez reklam yapmak.")
  
} else if(warns == 30) {
  message.member.ban({reason: "30 reklam yapmak."})
} 
db.add("reklam_" + message.author.id, 1)
}, 100)
}