const { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Client } = require("discord.js");
const ticketSettings = require('../../models/ticketSettings.js')

module.exports = {
    name: 'ticket',
    description: 'Ticket sisteminin kurulumu.',
    options: [
        {
            name: "ticket-kanalı",
            description: "Destek taleplerinin açılacağı kanal",
            type: "CHANNEL",
            required: true
        },
        {
            name: "log-kanalı",
            description: "Destek taleplerinin kaydının atılacağı oda.",
            type: "CHANNEL",
            required: true
        },
        {
            name: "destek-rolü",
            description: "Destek yetkililerinin rolü.",
            type: "ROLE",
            required: true
        }
    ],
    /**
    *
    * @param {CommandInteraction} interaction
    * @param {Client} client
    *
    */
    run: async(client, interaction) => {

        const getRoleId = interaction.options.getRole('destek-rolü')
        const getLogChannel = interaction.options.getChannel('log-kanalı');
        const getTicketChannel = interaction.options.getChannel('ticket-kanalı');

        if(interaction.memberPermissions.has === "ADMINISTRATOR") return interaction.followUp('Bu komut için gerekli yetkiniz yok!');
        const ticketbtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('btn1')
                    .setStyle('SUCCESS')
                    .setEmoji('🎫')
            )
        const ticketembed = new MessageEmbed()
            .setTitle(`**${interaction.guild.name} | Destek Talebi**`)
            .setColor('RED')
            .setDescription(`
                Destek talebinizi oluşturmak için aşağıdaki butona basmanız yeterlidir.

                Güvenlik nedeniyle talepleriniz kayıt altına alınmaktadır.
                Gereksiz talepler kapatılacak ve talep sahibi cezalandırılacaktır!
            `)
            .setThumbnail(interaction.guild.iconURL({ format: "png", size: 64 }))
            .setImage('https://i.hizliresim.com/ddz2x51.png')
        getTicketChannel.send({ embeds: [ticketembed], components: [ticketbtn] })
        .then(async() => {
            const getDb = await ticketSettings.findOne({ guildId: interaction.guildId }).exec()
            if(getDb != interaction.guildId) { 
                await ticketSettings.insertMany({
                    guildId: interaction.guildId,
                    logChannel: getLogChannel.id,
                    modRole: getRoleId.id
                })
                await interaction.followUp(`Destek mesajı ${getTicketChannel} kanalına gönderildi ve log kanalı ${getLogChannel} olarak seçildi!`)
            } else if(getDb == interaction.guildId) {
                await ticketSettings.findOneAndUpdate({ guildId: interaction.guildId }, { logChannel: getLogChannel.id, modRole: getRoleId.id }).exec();
                await interaction.followUp(`Destek mesajı ${getTicketChannel} kanalına gönderildi ve log kanalı ${getLogChannel} olarak güncellendi!`)
            }
        })
    }
 }