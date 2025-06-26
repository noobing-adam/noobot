const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
this.fighting = new Set();
module.exports = {
category: "Oyun",
data: new SlashCommandBuilder()
  .setName("düello")
  .setDescription("Biriyle savaş yaparsınız.")
.addUserOption(option =>
		option
			.setName('kişi')
			.setDescription('Savaşmak istediğiniz kişi.')
      .setRequired(true)
)
.addIntegerOption(option =>
    option
      .setName("can")
      .setDescription("Düelloda canınınızın olacağını belirlersiniz. (default: 500 & min = 100 & max = 3000)")
      .setMaxValue(3000)
      .setMinValue(100)
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let dön = 0
let ekveri = ""  
	let opponent = interaction.options.getUser("kişi")
  let can = interaction.options.getInteger("can") ? Number(interaction.options.getInteger("can")) : 500
  if (opponent.id == interaction.user.id) return err('Kendin ile düello atamazsın!');
		if (this.fighting.has(interaction.channel.id)) err('Kanal başına sadece bir düello meydana gelebilir.');
		this.fighting.add(interaction.channel.id);
		try {
			if (!opponent.bot) {
let yes = new Discord.ButtonBuilder().setStyle("Success").setLabel("Kabul Et").setCustomId("yes")
let no = new Discord.ButtonBuilder().setStyle("Danger").setLabel("Reddet").setCustomId("no")
let row = new Discord.ActionRowBuilder().addComponents(yes).addComponents(no)
interaction.reply({content: opponent.toString(),embeds: [Embed(opponent.tag + " Sana bir savaş isteği gönderildi. Butonlara basıp işlem yapabilirsin.","Kabul etmek veya reddetmek için 60 saniyen var.","info")], components: [row], ephemeral: false}).catch(err => {})
const filter2 = (i) => (i.customId === "yes" || i.customId === "no") && i.user.id === opponent.id
let int = await interaction.channel.awaitMessageComponent({ filter: filter2, time: 60000 }).catch(err => {
dön = 1
			this.fighting.delete(interaction.channel.id);
return interaction.editReply({components: [], content: "1 dakika dolduğu için savaş iptal edildi.", embeds: []})
})
if(int.customId == "no"){
			this.fighting.delete(interaction.channel.id);
return interaction.editReply({components: [], content: "Savaş reddedildi.", embeds: []})
}
      }
if(dön == 1) return;
interaction.reply("Rakip NOOBOT tarafından kontrol edilecektir.").catch(err3 => {
interaction.channel.send("Savaş kabul edildi. savaş başlıyor.")
})
			let userHP = can ? Number(can) : 500;
			let oppoHP = can ? Number(can) : 500;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			};
			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			}
			while (userHP > 0 && oppoHP > 0) {
				const user = userTurn ? interaction.user : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
let saldır = new Discord.ButtonBuilder().setStyle("Primary").setLabel("Saldır").setCustomId("saldır")
let savun = new Discord.ButtonBuilder().setStyle("Primary").setLabel("savun").setCustomId("savun")
let ultragüç = new Discord.ButtonBuilder().setStyle("Primary").setLabel("Ultra güç").setCustomId("ultragüç")
let kaç = new Discord.ButtonBuilder().setStyle("Primary").setLabel("Kaç").setCustomId("kaç")
let row = new Discord.ActionRowBuilder().addComponents(saldır).addComponents(savun).addComponents(ultragüç).addComponents(kaç)
const filter = (i) => (i.customId === "saldır" || i.customId === "savun" || i.customId === "ultragüç" || i.customId === "kaç") && i.user.id === user.id
					await interaction.channel.send({content: `
						${user}, ne yapmak istersin? \`saldır\`, \`savun\`, \`ultra güç\`, veya \`kaç\`?
						**${interaction.user.username}**: ${userHP} 💗
						**${opponent.username}**: ${oppoHP} 💗
					`, components: [row]});
const turn =  await interaction.channel.awaitMessageComponent({ filter: filter, time: 60000 }).catch(err => {})

					if (!turn || !turn.customId) {
						await interaction.channel.send(`Üzgünüm ama, süre doldu!`);
						reset();
						continue;
					}
					choice = turn.customId
          ekveri = turn
				} else {
					const choices = ['saldır', 'savun', 'ultragüç'];
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'saldır') {
					const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
if(ekveri.customId){
					await ekveri.reply(`${user}, **${damage}** hasar vurdu!`);
ekveri = {}
} else {
					await interaction.channel.send(`${user}, **${damage}** hasar vurdu!`);
}
					dealDamage(damage);
					reset();
				} else if (choice === 'savun') {
if(ekveri.customId){
					await ekveri.reply(`${user}, kendisini süper kalkan ile savundu!`);
ekveri = {}
} else { 
					await interaction.channel.send(`${user}, kendisini süper kalkan ile savundu!`);
}
					guard = true;
					reset(false);
				} else if (choice === 'ultragüç') {
					const miss = Math.floor(Math.random() * 3);
					if (!miss) {
						const damage = Math.floor(Math.random() * ((guard ? 150 : 300) - 100 + 1)) + 100;
if(ekveri.customId){
					await ekveri.reply(`${user}, Çoook uzak galaksilerden gelen ultra sonik enerjiyi yeterki miktarda topladın ve **${damage}** hasar vurdun!!`);
ekveri = {}
} else {
						await interaction.channel.send(`${user}, Çoook uzak galaksilerden gelen ultra sonik enerjiyi yeterki miktarda topladın ve **${damage}** hasar vurdun!!`);
}
						dealDamage(damage);
					} else {
if(ekveri.customId){
					await ekveri.reply(`${user}, Çoook uzak galaksilerden gelen ultra sonik enerjiyi yeterli miktarda toplayamadığın için ulta güç kullanamadın!`);
ekveri = {}
} else {
						await interaction.channel.send(`${user}, Çoook uzak galaksilerden gelen ultra sonik enerjiyi yeterli miktarda toplayamadığın için ultra gücü kullanamadın!`);
}
					}
					reset();
				} else if (choice === 'kaç') {
if(ekveri.customId){
					await ekveri.reply(`${user}, kaçtı! Korkak!`);
ekveri = {}
} else {
	await interaction.channel.send(`${user}, kaçtı! Korkak!`);
}
					forfeit();
					break;
				} else {
return "sa"
					await interaction.channel.send('Ne yapmak istediğini anlamadım.');
				}
			}
			this.fighting.delete(interaction.channel.id);
            const winner = userHP > oppoHP ? interaction.user : opponent;
			return interaction.channel.send(`Oyun bitti! Tebrikler, **${winner}** kazandı! \n**${interaction.user.username}**: ${userHP} :heartpulse: \n**${opponent.username}**: ${oppoHP} :heartpulse:`);
		} catch (err) {
			this.fighting.delete(interaction.channel.id);
			throw err;
		}
}
}