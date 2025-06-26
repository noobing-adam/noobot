module.exports = client => {
const { QuickDB } = require("quick.db");
const db = new QuickDB();
  client.on("messageCreate", async message => {
if(!message.guild) return;
if(!message.member) return;
if(!await db.get("capsengel_" + message.guild.id)) return;
if((message.content && message.content.length < 5) || message.author.bot || !message.member || message.member.permissions.has("Administrator")) return;
let harfs = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'ğ', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y','z', 'w', 'x', 'q']
let şeys = message.content.split(" ").join("").split("").filter(x => harfs.some(harf => harf.toLocaleUpperCase("tr") == x)).length
let percent = Number(((şeys/message.content.split(" ").join("").split("").length) * 100).toString().split(".")[0])
let yüzde = await db.get("capsengel_" + message.guild.id)
if(percent > yüzde){
message.author.send(message.guild.name + " sunucusunda caps nedeniyle silinen mesajın (Atılabilir hâle getirildi.): " + message.content.toLocaleLowerCase("tr")).catch(err => {})
message.delete().catch(err => {})
message.channel.send(`${message.author.toString()} Bu sunucuda fazla büyük harf kullanmak yasak. (Mesajın %${percent} büyük harf içeriyor.)`).then(x => {
setTimeout(() => {x.delete().catch(err => {})}, 10000)
})
}
})
}