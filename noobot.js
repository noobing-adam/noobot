const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Discord = require("discord.js")
const fs = require("fs")
let ayarlar = require("./ayarlar.json")
let Embed = require("./tools/embed.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const client = new Discord.Client({intents: Object.values(Discord.IntentsBitField.Flags)}) 
const wait = require('util').promisify(setTimeout);
global.db = {}

client.on("interactionCreate", async button => {
if(!button.isButton())  return
let interaction = global.db["data_" + button.message.id]
let update = page => {
global.db["data_" + button.message.id]["currentPage"] = page
interaction.currentPage = page
}
if(!interaction) return;
let err = x => button.reply({embeds: [require("./embed.js")("Hata!",x,"error")], ephemeral: true})
if(interaction.interactor.id !== button.user.id) return err("Bu komut senin değil!") 
        if (button.customId == 'next-page') {
            (interaction.currentPage + 1 == interaction.embeds.length ? update(0) : update(interaction.currentPage += 1));
button.deferUpdate()
            button.message.edit({ embeds: [interaction.embeds[interaction.currentPage]], components: [interaction.components] });
        } else if (button.customId == 'back-page') {
            (interaction.currentPage - 1 < 0 ? update(interaction.embeds.length - 1) : update(interaction.currentPage -= 1));
button.deferUpdate()
         button.message.edit({ embeds: [interaction.embeds[interaction.currentPage]], components: [interaction.components] });
        } else if (button.customId == 'delete-page') {
button.deferUpdate()
global.db["data_" + button.message.id] = null;
            button.message.edit({content: `:white_check_mark: İşlem bitti. :white_check_mark:`, embeds: [], components: []});
            wait(5000).then(async () => {
                 button.message.delete();
            });
        }
    })

/*
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

		const modal = new Modal()
			.setCustomId('myModal')
			.setTitle('My Modal');
		const favoriteColorInput = new TextInputComponent()
			.setCustomId('favoriteColorInput')
			.setLabel("What's your favorite color?")
			.setStyle('SHORT');
		const hobbiesInput = new TextInputComponent()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
			.setStyle('PARAGRAPH');
		const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);
		const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);
		modal.addComponents(firstActionRow, secondActionRow);
		await interaction.showModal(modal);
client.on('interactionCreate', interaction => {
	if (!interaction.isModalSubmit()) return;

	if (interaction.customId === 'myModal') {
		await interaction.reply({ content: 'Your submission was recieved successfully!' });
	}
});
interaction.fields.getTextInputValue('favoriteColorInput');
*/
client.on("ready", () => {
	console.log(client.user.username + " Adı ile giriş yapıldı.")
let aray = [
"Kadirin kuzeni istedi diye yeni komutlar",
"geri döndüm",
"/yenilikler yaz ve gör"
]
client.user.setActivity(aray[Math.floor(Math.random() * aray.length)], { type: Discord.ActivityType.Playing });
setTimeout(() => {
client.user.setActivity(aray[Math.floor(Math.random() * aray.length)], { type: Discord.ActivityType.Playing });
}, 60000)
})
const { REST, Routes } = require('discord.js');

//Handler
client.commands = new Discord.Collection()
let commandArray = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command)
commandArray.push(command.data.toJSON())
}
//Events
	let eventfunction = (event) => require(`./events/${event}`)(client)
fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(event => {

	eventfunction(event)
})
  fs.readdirSync("./guards").filter(x => x.endsWith(".js")).forEach(xx => require("./guards/"+xx)(client))
  require("./tools/emoji.js")(client)

  
  
const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
	try {
		console.log('Slash (/) komutları yüklenmeye başlandı.');
let avel = commandArray.filter(x => x.name == "eval")
commandArray = commandArray.filter(x => x.name !== "eval")
		await rest.put(
				Routes.applicationGuildCommands("990588829255745568", "998927842651947088"),
				{ body: avel },
			).catch(err => {})
			await rest.put(
				Routes.applicationCommands("990588829255745568"),
				{ body: commandArray },
			).catch(err => {})
		
				console.log('Slash (/) komutları başarıyla yüklendi.');
	} catch (error) {
		console.error(error);
	}
})();
client.on('interactionCreate', async interaction => {
	if (interaction.type !== 4) return;
if(interaction.commandName == "yardım") {
            let focused = interaction.options.getFocused(1)
if(focused.name == "komut"){
focused = focused.value
            let choices = Array.from(interaction.client.commands.keys())
            let filtered = choices.filter(sü => sü.includes(focused))
            const result = filtered.map(choice => ({ name: choice, value: choice }))
let realresult = []
let i = 0
result.forEach(res => {
if(i >= 25) return;
i++
realresult.push(res)
})
interaction.respond(realresult)
} else if(focused.name == "kategori"){
focused = focused.value
            let choices = []
interaction.client.commands.forEach(x => {
if(!choices.some(y => y == x.category) && x.category !== "owner-özel") choices.push(x.category)
})
            let filtered = choices.filter(sü => sü.toLocaleLowerCase("tr").includes(focused.toLocaleLowerCase("tr")))
            const result = filtered.map(choice => ({ name: choice, value: choice }))
let realresult = []
let i = 0
result.forEach(res => {
if(i >= 25) return;
i++
realresult.push(res)
})
interaction.respond(realresult)
}
        }
})
//interactionCreate.js
client.on("interactionCreate", async interaction => {
	if(interaction.type !== 2) return

	const command = client.commands.get(interaction.commandName)
	if(!command) return
if(interaction.commandName == "fake-mesaj" && interaction.user.username.toUpperCase().includes("KADIR")) return interaction.reply("Affedersiniz fake-mesaj komutu gaylerin kullanımına kapalıdır.")
let channels = ["998927842651947096","998927842651947094","998927843096535110"]
if(channels.includes(interaction.channel.id)) return interaction.reply({ephemeral: true, content: "<#998927842651947095> kanalı dışında komut kullanılamaz."})
	try{
		await command.execute(interaction, client) 
	}
	catch(err) {
		interaction.reply("Komutta bir hata oluştu.").catch(err => interaction.channel.send(interaction.user.toString() + " komutta bir hata oluştu."))
		console.log(err)
	}
})



let app = require("express")()
app.get("/", function(req,res){
return  res.sendStatus(200);
})



client.on("ready", async() => {
setInterval(async() => {
let sws = await db.get("panelsws")
sws = sws ? sws.filter(sw => sw !== "for an array error") : []
if(!sws || sws.length < 1) return;
sws.forEach(sw => {
if(!client.guilds.cache.get(sw.id)) return db.pull("panelsws", (i) => i.id == sw.id)
if(client.channels.cache.get(sw.üyechn)) client.channels.cache.get(sw.üyechn).setName("Toplam Üye Sayısı • " + client.guilds.cache.get(sw.id).memberCount).catch(err => {})
if(client.channels.cache.get(sw.botchn)) client.channels.cache.get(sw.botchn).setName("Bot Sayısı • " + client.guilds.cache.get(sw.id).members.cache.filter(x => x.user.bot).size).catch(err => {})
if(!client.channels.cache.get(sw.üyechn) && !client.channels.cache.get(sw.botchn)){
if(sw.açan && client.users.cache.get(sw.açan)){
client.users.cache.get(sw.açan).send(client.guilds.cache.get(sw.id).name + " sunucusundaki panel sistemi kanallar silindiği için kapatıldı.").catch(err => {})
}
db.pull("panelsws", (i) => typeof i == "object" && i.id == sw.id)
}
})
}, 30000)
})

client.on("ready", () => {
const { AutoPoster } = require('topgg-autoposter')
const Topgg = require("@top-gg/sdk")
const webhook = new Topgg.Webhook(process.env.topggauth)
const ap = AutoPoster(process.env.topggtoken, client)

ap.on('posted', () => {
  console.log("İstatistikler Top.gg'ye gönderildi.")
})
app.post("/dblwebhook", webhook.listener(async vote => {
db.set("vote_" + vote.user, Number(Date.now() + 12 * 60 * 60 * 1000))
let user = client.users.cache.get(vote.user)
if(user){
user.send("Botumuza verdiğin oy için teşekkür ederim. Artık oy gerektiren komutlarımızı kullanabilirsin.").catch(err => {})
}
}))
})

db.set("vote_829778241396408360", Number(Date.now() + 24 * 60 * 60 * 1000))


app.listen(process.env.PORT)
client.login(process.env.token)