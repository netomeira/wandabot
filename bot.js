var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

    bot.sendMessage({
        to: '805619572408582166',
        message: 'Hello guys! I\'m Wanda Bot. Pleasure to meet you!'
    });
});

bot.on('disconnect', function (evt) {
    logger.info('Bot disconnected!');
    logger.info('Attempting to reconnect...');

    bot.connect();

    logger.info('Reconnected successfully!');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'hello':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello ' + user + '! Nice to meet you!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});