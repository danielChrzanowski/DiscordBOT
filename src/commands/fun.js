module.exports = {
    name: 'fun',
    description: 'Shows fun photo',

    execute(client, message, args) {
        message.channel.send(`Fun <:uganda:783095652212670514>`, { files: ["./src/assets/fun.png"] });
    }
    
}