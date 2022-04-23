const client = require('../index')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const tickets = require('../models/tickets.js');
const ticketSettings = require('../models/ticketSettings.js');
const { writeFileSync } = require('node:fs');
const path = require('node:path');
const wait = require('node:timers/promises').setTimeout;

client.on('interactionCreate', async (interaction) => {
    const getTickets = await tickets.findOne({ userId: interaction.user.id }).exec();
    const getTicketSettings = await ticketSettings.findOne({ guildId: interaction.guildId }).exec();
    if (!interaction.isButton()) return;
    if (interaction.customId === "btn1") {
        if (getTickets == undefined) {
            tickets.insertMany({
                userId: interaction.user.id,
                ticketSize: 1
            });
            const channel = interaction.guild.channels.create(`${interaction.user.tag}-talep`,{
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ],
            });
            module.expotrs = channel;
            await interaction.reply({ content:"Talebiniz oluşturuldu!", ephemeral: true });
            const closeembed = new MessageEmbed()
            .setTitle(`**${interaction.guild.name} | Destek Talebi**`)
            .setColor('RED')
            .setDescription(`
                Hoş geldiniz ${interaction.user.tag}!
                Sorununu talep yetkililerine anlatarak çözüme ulaşabilirsin!

                Talebi kapatmak için butona basman yeterli!
            `)
            .setTimestamp()
        const closeticket = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('btn2')
                    .setStyle('DANGER')
                    .setEmoji('🔒')
            )
            ;(await channel).send({ embeds: [closeembed], components: [closeticket] })
        }
        else if (getTickets.ticketSize >= 2) {
            return interaction.reply({ content: "Maksimum talep sayısına (`2`) ulaştınız!", ephemeral: true });
        } else if (getTickets.ticketSize <= 2){
            await tickets.findOneAndUpdate({ userId: interaction.user.id }, { ticketSize: getTickets.ticketSize += 1 })

            const channel = interaction.guild.channels.create(`${interaction.user.tag}-talep`,{
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: getTicketSettings.modRole,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ],
            });
            await interaction.reply({ content:"Talebiniz oluşturuldu!", ephemeral: true });
            const closeembed = new MessageEmbed()
            .setTitle(`**${interaction.guild.name} | Destek Talebi**`)
            .setColor('RED')
            .setDescription(`
                Hoş geldiniz ${interaction.user.tag}!
                Sorununu talep yetkililerine anlatarak çözüme ulaşabilirsin!

                Talebi kapatmak için butona basman yeterli!
            `)
            .setTimestamp()
        const closeticket = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('btn2')
                    .setStyle('DANGER')
                    .setEmoji('🔒')
            )
            ;(await channel).send({ content: `<@&${getTicketSettings.modRole}>, <@${getTickets.userId}>`, embeds: [closeembed], components: [closeticket] })
        }
}
    if(interaction.customId === "btn2") {
        interaction.component.setDisabled(true)
        await tickets.findOneAndUpdate({ userId: interaction.user.id}, { ticketSize: getTickets.ticketSize -= 1 })
        await interaction.deferUpdate();
        interaction.channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: false })
        const removeticket = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('btn3')
                        .setStyle('DANGER')
                        .setEmoji('✖')
                )
        
        interaction.channel.send({ content: "Bu talep kapatıldı! Silmek ister misin?", components: [removeticket] })
    }
    if(interaction.customId === "btn3") {
        let htmlString = "<body style=\"background-color: #23272a;\">\n<hr>";
        await interaction.channel.messages.fetch({ limit: 100 })
        .then(async(messages) => {
            messages.forEach(async msg => {
                htmlString += `\t<img src="${msg.author.displayAvatarURL({ format: 'png', size: 32 })}" style="border-radius: 50%; float: left;"></img><p style=\"color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\">${msg.author.tag}: ${msg.content}</p><hr>\n`
            })
            htmlString += "\n</body>"
        })
        writeFileSync("index.html", htmlString, (err, data) => {
            console.log(err);
        })
        await interaction.deferUpdate();
        await interaction.channel.delete();

        const htmlFile = path.join(__dirname, '../', 'index.html')

        const getLogChannel = await ticketSettings.findOne({ guildId: interaction.guildId }).exec();
        const logChannel = interaction.guild.channels.cache.get(getLogChannel.logChannel);
        logChannel.send({ content: "Bir talep silindi! İşte kayıtları (HTML Formatında) :", files: [htmlFile] })
    }

    if(!interaction.customId === "btn1") return;
    if(!interaction.customId === "btn2") return; 
    if(!interaction.customId === "btn3") return; 
})