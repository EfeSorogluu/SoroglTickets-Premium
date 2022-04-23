const mongoose = require('mongoose');
const { Schema } = mongoose;

const tickets = new Schema({
    userId: String,
    ticketSize: { type: Number, default: 0, required: false }
})

module.exports = mongoose.model('Tickets', tickets, 'tickets');