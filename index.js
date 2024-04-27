const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1182941320457748611')
    .setType('STREAMING')
    .setURL('https://twitch.tv/imdoremon') //Must be a youtube video link 
    .setState("I'm Doremon")
    .setName('Doremon On Top')
    .setDetails(`Playing Doremon Network [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1175478503957872730/1233772829657399357/Doremon_Network_Animated_Banner_2.gif?ex=662e4ffc&is=662cfe7c&hm=5cfdda4798264594c2b2c74ec4512b6c36cb419ea2335356bb82df1124892a72&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Doremon Network') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1175478503957872730/1233775521469562890/Im_Doremon_Glitch.gif?ex=662e527e&is=662d00fe&hm=6ab9452b02a6a26c7d1e5efc41f993f7fb8479f2dcab951fa3471f9751f98211&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText("I'm Doremon") //Text when you hover the Small image
    .addButton('Youtube Channel', 'https://www.youtube.com/channel/UCvQ4dmqsuzzgyxP93tFvVSA')
    .addButton('Discord Server', 'https://www.dsc.gg/imdoremon');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Doremon Network [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
