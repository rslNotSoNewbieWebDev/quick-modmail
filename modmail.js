const Discord = require('discord.js');
const client = new Discord.Client();
const { token,thumb,modmailServerId,ticketCategoryID,modmailLogChannelId,mainServerId } = require('./config.json');

var prefix="!mm ";
client.once('ready', () => {
     console.log('Ready!');
    
}); 
 var reason;
 var ticketName;
client.on('message', message => { 
    if (message.author.bot || !(message.channel.parentID === ticketCategoryID || message.channel.type === 'dm')) return;
const serverName = client.guilds.cache.get(mainServerId).name;
console.log(serverName);
   
const argCmd = message.content.slice(prefix.length).trim().split(' ');
const cmd = argCmd.shift().toLowerCase();
const args = message.content.slice(prefix.length+cmd.length).trim().split('/ +/')
if (message.channel.type==='dm') {
    try{
    
    var ticketNamerep1 = message.author.tag.replace(/#/g, "-");
    ticketName = ticketNamerep1.replace(/ /g, "-").toLowerCase();
var userID = message.author.id;  

console.log(userID);
    console.log(`${ticketName}-${userID}`/*.split("-").pop()*/);
const logMailCEmbed = new Discord.MessageEmbed();
logMailCEmbed.setColor('#05ff09')
logMailCEmbed.setAuthor(`${serverName} Support`,thumb)
logMailCEmbed.setTimestamp()
logMailCEmbed.setTitle("Ticket Created!")
logMailCEmbed.setThumbnail(thumb)
logMailCEmbed.setDescription(`Ticket created by ${message.author}.`)
logMailCEmbed.setFooter(`Ticket: ${ticketName} | Subject: ${message.content}`)
    if ((!client.guilds.cache.get(modmailServerId).channels.cache.some(channel => channel.name.split('-').pop() === userID))) {
reason=message.content;
    var channel = client.guilds.cache.get(modmailServerId).channels.create(`${ticketName}-${userID}`, {parent : ticketCategoryID});
channel.then(c => c.setTopic(reason)).then(c => c.send(logMailCEmbed));

  const lc = client.channels.fetch(modmailLogChannelId).then(l => {l.send(logMailCEmbed)});
  
    const createMailEmbed = new Discord.MessageEmbed();
    createMailEmbed.setColor('#05ff23')
    createMailEmbed.setAuthor(`${serverName} Support`,thumb)
    createMailEmbed.setTimestamp()
    createMailEmbed.setTitle("Ticket Created!")
    createMailEmbed.setThumbnail(thumb)
    createMailEmbed.setDescription('Our support team will be with you shortly!')
    createMailEmbed.setFooter(`Ticket: ${ticketName} | Subject: ${reason}`)

message.author.send(createMailEmbed);
}}  
catch(err){
message.author.send(':x:Too many tickets are open at the moment; please wait a bit and then try again. If you')

message.react('❌');
console.log(err);
return;
    }
    message.react('✅'); 
    const sc = client.guilds.cache.get(modmailServerId).channels.cache.find(channel => channel.name.split("-").pop() === userID);
    const inMailEmbed = new Discord.MessageEmbed();
    inMailEmbed.setColor('#5555F9')
    
    inMailEmbed.setAuthor(message.author.tag,message.author.avatarURL())
    inMailEmbed.setTimestamp()
    inMailEmbed.setTitle("Incoming Message!")
    inMailEmbed.setThumbnail(thumb)
    inMailEmbed.setDescription(message.content)
    inMailEmbed.setFooter(`Ticket: ${ticketName} | Subject: ${reason}`)
    const ls = client.channels.fetch(modmailLogChannelId).then(l => {l.send(inMailEmbed)});
   
  
   try{sc.send(inMailEmbed);}
   catch(err){console.log(console.error())}
console.log(!(client.guilds.cache.get(modmailServerId).channels.cache.some(channel => channel.name === ticketName)));
}

if (message.channel.parentID === ticketCategoryID) {
    if (cmd === "reply" || cmd === "respond") {
var UID=message.channel.name.split("-").pop();
var user = client.users.cache.get(`${UID}`);

const outMailEmbed = new Discord.MessageEmbed();
    outMailEmbed.setColor('#F9A808')
    outMailEmbed.setAuthor(message.author.tag,message.author.avatarURL())
    outMailEmbed.setTimestamp()
    outMailEmbed.setTitle("Reply from Support")
    outMailEmbed.setThumbnail(thumb)
    outMailEmbed.setDescription(args)
    outMailEmbed.setFooter(`Ticket: ${ticketName} | Subject: ${reason}`)
    const lso = client.channels.fetch(modmailLogChannelId).then(l => {l.send(outMailEmbed)});

console.log(user);
console.log(UID);
try{user.send(outMailEmbed);}
catch(err){console.log("error")}
message.react('📧');
    }
if (cmd==='areply' || cmd === 'arespond') {
    var UID=message.channel.name.split("-").pop();
    var user = client.users.cache.get(`${UID}`);
    
    const outMailEmbed = new Discord.MessageEmbed();
        outMailEmbed.setColor('#F9A808')
        outMailEmbed.setAuthor('Anonymous Support Member', thumb)
        outMailEmbed.setTimestamp()
        outMailEmbed.setTitle("Reply from Support")
        outMailEmbed.setThumbnail(thumb)
        outMailEmbed.setDescription(args)
        outMailEmbed.setFooter(`Ticket:${ticketName} | Subject: ${reason}`)
        const outMailEmbedL = new Discord.MessageEmbed();
        outMailEmbedL.setColor('#F9A808')
        outMailEmbedL.setAuthor(`[ANONYMOUS REPLY] ${message.author.tag}`,message.author.avatarURL())
        outMailEmbedL.setTimestamp()
        outMailEmbedL.setTitle("Reply from Support")
        outMailEmbedL.setThumbnail(thumb)
        outMailEmbedL.setDescription(args)
        outMailEmbedL.setFooter(`Ticket: ${ticketName} | Subject: ${reason}`)
        const lsao = client.channels.fetch(modmailLogChannelId).then(l => {l.send(outMailEmbedL)});
    console.log(user);
    console.log(UID);
    try{user.send(outMailEmbed);}
    catch(err){console.log("error")}
    message.react('📧');

}
if (cmd==='close') {

    const closeMailEmbed = new Discord.MessageEmbed();
    closeMailEmbed.setColor('#f70505')
    closeMailEmbed.setAuthor(`🔒Locked`, thumb)
    closeMailEmbed.setTimestamp()
    closeMailEmbed.setTitle("Ticket Closed")
    closeMailEmbed.setThumbnail(thumb)
    closeMailEmbed.setDescription("This ticket has been closed.")
    closeMailEmbed.setFooter(`Ticket: ${ticketName} | Subject: ${reason}`)
    var UID=message.channel.name.split("-").pop();
    var user = client.users.cache.get(`${UID}`);
     user.send(closeMailEmbed);
     message.channel.delete();
   
    const lcs = client.channels.fetch(modmailLogChannelId).then(l => {l.send(closeMailEmbed)});

}
}

;});

client.login(token);