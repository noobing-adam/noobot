const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("rastgele-şifre")
  .setDescription("Rastgele bir şifre üretir.")
.addIntegerOption(option =>
		option
			.setName('uzunluk')
			.setDescription('Şifrenizin uzumluğunun ne kadar olmasını istediğiniz.')
			.setRequired(true)
.setMinValue(4)
.setMaxValue(32)
)
,execute: async(interaction, client) => { 
        function randomPassword(uzunluk) {
    var maske = `qQwWeE!0rRtTyY1uUıI&oO2pPğĞüÜ3aAsSdD4f_FgG-hH5jJkKlL6şŞ.iİzZ7xXcC\vV8bBnNmM9öÖçÇ`;
    
    var sonuc = '';
    
     
    
    for (var i = uzunluk; i > 0; --i) 
    
    {
    
    sonuc += maske[Math.floor(Math.random() * maske.length)];
    
    }
    
    return sonuc;
}
interaction.reply({embeds: [Embed("Rastgele şifren oluşturuldu.",interaction.options.getInteger("uzunluk") + " uzunluğundaki şifren: " + randomPassword(interaction.options.getInteger("uzunluk")),"info")], ephemeral: true})
}
}