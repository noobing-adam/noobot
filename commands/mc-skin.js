const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
const axios = require("axios").default
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("mcskin")
  .setDescription("Girdiğiniz kullanıcı adına sahip kişinin minecraft skinini gösterir.")
.addStringOption(option =>
		option
			.setName('kullanıcı')
			.setDescription('Minecraft skinine bakmak istediğiniz kullanıcının adı.')
      .setRequired(true)
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let name = interaction.options.getString("kullanıcı").toString()
axios.get("https://mc-heads.net/minecraft/profile/" + name).then(dat => {
if(!dat.data || dat.data.length < 1) return err("Girdiğiniz kullanıcı adına sahip bir kişi bulunamadı.")
interaction.reply({content: name + " adlı kullanıcının skini:", files: [{attachment: "https://mc-heads.net/body/" + name + ".png"}]})
}).catch(err2 => {return err("Kullanıcının verisi çekilirken bir hata oluştu.")})
}
}