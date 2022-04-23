const client = require("../index");
const mongoose = require('mongoose');


client.once("ready", async() => {
    console.log(client.user.tag + " Bot Hazır!");
    client.user.setPresence({status: "online", activities: [{name: "Talepleri", type: "WATCHING" }]});
    await mongoose.connect('mongodb://admin:efe123efe@0.0.0.0:27017/admin')
    .then(() => {
        console.log("MongoDB Bağlantısı başarılı!")
    })
    .catch((e) => {
        console.log(e)
    })
});