const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("oylama")
  .setDescription("Bir oylama başlatırsınız.")
.addStringOption(option =>
		option
			.setName('soru')
			.setDescription('Oylama sorunuz.')
			.setRequired(true)
)
.addStringOption(option =>
		option
			.setName('seçenekler')
			.setDescription('Oylamadaki seçenekler (Aralarına virgül koyunuz, Max 10 seçenek hakkınız var.).')
			.setRequired(true)
)
,execute: async(interaction, client) => { 
let seçenekler = interaction.options.getString("seçenekler")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!seçenekler.includes(",")) return err("En az 2 seçenek eklemek zorundasınız.")
if(seçenekler.split(",").length > 10) return err("En fazla 10 seçenek ekleyebilirsiniz.")
seçenekler = seçenekler.split(",")
let i = 0
let i2 = 0
seçenekler.forEach(y => {
if(y.startsWith(" ")){seçenekler[i] = y.replace(" ", "")}
i++
});
seçenekler.forEach(y => {
if(y.startsWith(" ")){seçenekler[i2] =y.replace(" ", "")}
i2++
});
let yazı = ""
let iy = 0
let emoj = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
seçenekler.forEach(x => {
yazı = yazı + emoj[iy] + " = " + x + "\n" 
iy++
})
let soru = interaction.options.getString("soru")
let embed = Embed("Yeni bir oylama başlatıldı.", "Başlatan: " + interaction.user.toString(), "info")
embed.addFields({name: "Soru:", value: "**" + soru + "**"},
{name: "Seçenekler:", value: yazı}
)
interaction.reply({embeds: [embed]}).then(x => {
interaction.fetchReply().then(msg => {
for(let sav = 0; sav < seçenekler.length;sav++){
msg.react(emoj[sav])
}
})
})
}
}