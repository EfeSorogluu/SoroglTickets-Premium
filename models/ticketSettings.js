const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSettings = new Schema({
    guildId: String,
    logChannel: String,
    modRole: String
})

module.exports = mongoose.model('ticketSettings', ticketSettings, 'ticket-settings');