const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("yardım")
  .setDescription("Yardım menüsünü gösterir.")
.addStringOption(option =>
		option
			.setName('komut')
			.setDescription('Hakkında yardım almak istediğiniz komut.')
			.setAutocomplete(true)
)
.addStringOption(option =>
		option
			.setName('kategori')
			.setDescription('Bakmak istediğiniz kategori.')
			.setAutocomplete(true)
)
,execute: async(interaction, client) => { 
const { createPages } = await require("../tools/epages.js")(client)
if(!interaction.options.getString("komut")){
let z = [];client.commands.map(x =>x.category).forEach(y => {if(!z.some(w => w== y) && y !== "owner-özel"){z.push(y)}})
let embeds = []
z.forEach(cat => {
let embed = Embed("NOOBOT Yardım Menüsü","Komutlar aşağıda gösterildi. Kategori: " + cat,"info").setFooter({text: "[] = Zorunlu & () = İsteğe göre"})
client.commands.filter(x => x.category == cat).forEach(cmd=>{
cmd = cmd.data
let req = client.commands.get(cmd.name).data.options.filter(x => x.required).map(x => `[${x.name}]`).join(" ")
let noreq = client.commands.get(cmd.name).data.options.filter(x => !x.required).map(x => `(${x.name})`).join(" ")
embed.addFields([{name: "/"+cmd.name+" "+req+" "+noreq, value: cmd.description}])
})
embeds.push(embed)
})
if(interaction.options.getString("kategori")){
if(client.commands.find(x => x.category.toLocaleLowerCase("tr") == interaction.options.getString("kategori").toLocaleLowerCase("tr"))){
let first = embeds.find(x => x.data.description.replace("Komutlar aşağıda gösterildi. Kategori: ","").toLocaleLowerCase("tr") == interaction.options.getString("kategori").toLocaleLowerCase("tr"))
let newar = [first]
embeds.forEach(x => {if(x.data.description.replace("Komutlar aşağıda gösterildi. Kategori: ","").toLocaleLowerCase("tr") !== interaction.options.getString("kategori").toLocaleLowerCase("tr")) newar.push(x)})
embeds = newar
}
}
interaction.reply("Yardım menüsü hazırlandı.").then(() => {
interaction.fetchReply().then(msg => {
createPages(interaction, embeds, "➡️", "⬅️", "❌", msg)
})})
} else {
let req = client.commands.get(interaction.options.getString("komut")).data.options.filter(x => x.required).map(x => `[${x.name}]`).join(" ")
let noreq = client.commands.get(interaction.options.getString("komut")).data.options.filter(x => !x.required).map(x => `(${x.name})`).join(" ")
interaction.reply({embeds:[Embed("/"+client.commands.get(interaction.options.getString("komut")).data.name+" komutunun bilgileri","**Komut adı:** \n"+client.commands.get(interaction.options.getString("komut")).data.name,"info").addFields([{name: "Komut açıklaması:",value: client.commands.get(interaction.options.getString("komut")).data.description},{name: "Komut kullanımı:",value: "/"+client.commands.get(interaction.options.getString("komut")).data.name+" "+req+" "+noreq}, {name: "Komut Kategorisi:",value: client.commands.get(interaction.options.getString("komut")).category}]).setFooter({text: "[] = Zorunlu & () = İsteğe göre"})]})
}
}
}