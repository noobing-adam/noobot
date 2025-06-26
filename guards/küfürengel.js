const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async client => {
  client.on("messageCreate", async message => {
if(!message.guild) return;
if(!await db.get("küfürengel_" + message.guild.id)) return;
if(!message.member) return
if(message.member.permissions.has("Administrator")) return;
    let d = require("discord.js")
    let timeout = (id, süre, sebep) => {
      if(!id) return message.member.send("Bir id girin")
      if(!süre) return message.member.send("Bir süre girin.")
      if(!sebep) return message.member.send("Bir sebep girin.")
      let member = message.guild.members.cache.get(id)
      member.timeout(süre,sebep).catch(err => {})
      
  }
const Embed = require("../tools/embed.js")
if(!await db.get("küfür_" + message.author.id + "_" + message.guild.id + "_" + message.guild.id)) db.set("küfür_" + message.author.id + "_" + message.guild.id, 0) 
   let array =  [
        "mq",
        "aq",
        "mına koyim",
        "ına koyim",
        "ına koyayım",
        "ina koyayım",
        "ına koyayim",
        "ina koyayim",
        "mina koyim",
        "amine",
        "döl",
        "sg",
        "oç",
        "oçe",
        "ananı sikim",
        "anneni sikim",
        "anneni sikeyim",
        "ananı sikeyim",
        "ağzına",
        "ağzına sıçim",
        "ağzına sıçayım",
        "ağzına s",
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yara",
        "yarra",
        "yarrak",
        "yarak",
        "amcık",
        "orospu",
        "orosbu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşak",
        "daşşak",
        "sikm",
        "sikim",
        "sikmm",
        "skim",
        "skm",
        "sg",
        "öç",
        "AQ",
        "AQI",
        "AQİ",
        "shit"
      ]
setTimeout(async() => {

  if(!array.some(x => message.content.toLowerCase().includes(x)) || message.author.bot) return
  let warns = await db.get("küfür_" + message.author.id + "_" + message.guild.id) +1
message.member.send({ embeds: [Embed(`**${message.guild.name}** sunucusunda uyarıldın.`, `${message.author}, küfür ettiğin için bu sunucuda uyarıldın. Toplam \`${warns}\` kez küfür etmişsin.`, "warn")]})  .catch(err => {})
message.delete().catch(err => {})
   if(warns == 5) {
    
    timeout(message.author.id, 1800000, "5 kez Küfür etmek.")
    
} else if(warns == 10) {
   timeout(message.author.id, 3600000, "10 kez Küfür etmek.")
 } else if(warns == 20) {
   timeout(message.author.id, 7200000, "20 kez Küfür etmek.")
  
} else if(warns == 30) {
  message.member.ban({reason: "30 küfür etmek."}).catch(err => {})
} 
db.add("küfür_" + message.author.id + "_" + message.guild.id, 1)
}, 100)
})
}