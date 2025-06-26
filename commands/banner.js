const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
let fetch = require("axios").default
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("banner")
  .setDescription("Bannerınızı gösterir.")
.addUserOption(option =>
		option
			.setName('kişi')
			.setDescription('Bannerına bakmak istediğiniz kişi.')
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let kişi = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
    let uid = kişi.id


    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Accept-Encoding": "*"
        }
    })

    let receive = ''
    let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'

    response.then(a => {
        if (a.status !== 404) {
                receive = a.data['banner']
             
                if (receive !== null) {

                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${client.token}`,
            "Accept-Encoding": "*"
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                        }

                    })
                }
        }
    }).catch(err => console.log(err._currentUrl))
    setTimeout(() => {
let eryaz = kişi.id == interaction.user.id ? " bannerınız bulunamadı." : kişi.tag+ " kullanıcısının bannerı  bulunamadı."
        if (!receive) return err(eryaz)
let yaz = kişi.id == interaction.user.id ? " bannerınız çekildi ve aşağıda gösteriliyor." : kişi.tag+ " kullanıcısının banerı çekildi ve aşağıda gösteriliyor."
        let embed = Embed(yaz,"","info")
            .setImage(banner)
        interaction.reply({embeds: [embed]})
    }, 1000)
}
}