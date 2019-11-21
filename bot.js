
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth2.json');
const config = require("./config.json");


var petNum = 0;
var fedNum = 0;
var fedHour;
var petHour;
var bar0 = "oooooooooo";
var bar1 = "xooooooooo";
var bar2 = "xxoooooooo";
var bar3 = "xxxooooooo";
var bar4 = "xxxxoooooo";
var bar5 = "xxxxxooooo";
var bar6 = "xxxxxxoooo";
var bar7 = "xxxxxxxooo";
var bar8 = "xxxxxxxxoo";
var bar9 = "xxxxxxxxxo";
var bar10 = "xxxxxxxxxx";
var happyBar = bar0;
var healthBar = bar0;
var hour;
var minute;
var dayMonth;
var dayWeek;
var nowMonth;
var nowYear;
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august','september', 'october','november','december'];
var days = ['sunday', 'monday','tuesday','wednesday','thursday', 'friday', 'saturday'];
var heeHawtime = Math.floor(Math.random() * 24); 



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.setInterval(ServerUpdate, 60000);
  ServerUpdate();
});

client.login(auth.token);




function ServerUpdate(){
    var now = new Date(); // current date
    hour = now.getHours();
    minute = now.getMinutes();
    dayMonth = now.getDate();
    dayWeek = now.getDay();
    nowMonth = now.getMonth();
    nowYear = now.getFullYear();
    //if(hour == 0){
    //  fedHour = 0;
    //  petHour = 0;
    //}

    if(hour >= fedHour+2){
      if (fedNum == 0){

      }
      else{
      fedNum--;
      updateHealth();
      fedHour = hour;
      }
    }

    if(hour >= petHour+1){
      if (petNum == 0){

      }
      else{
      petNum--;
      updateHappy();
      petHour = hour;
      }
    }

    if (petNum == 0){
    client.channels.find("id", "639160062916689947").send("give luv");
    }
    
    if (fedNum == 0){
      client.channels.find("id", "639160062916689947").send("give food");
    }

    if (hour == 9 && minute == 0){
      GoodMorning();
    }

    if (hour == 0 && minute == 0){
     heeHawtime = Math.floor(Math.random() * 24)
    }

    if (hour == heeHawtime && minute == 0){
    heeHaw();
    }
};



function GoodMorning(){
    if (minute < 10){
      minute = "0" + minute
    }
    client.channels.find("id", "639160062916689947").send("good morning! it is " + hour + ":" + minute + " on " + days[dayWeek] + ", " + months[nowMonth] + " " + dayMonth + ", " + nowYear );

}


client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`welcome to the stuniverse, ${member}`);
  });



client.on("message", async message => { //reads every incoming message
if(message.author.bot) return; //ignore if bot

Regular();

if(message.content.indexOf(config.prefix) !== 0) return; //ignore if not command
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //split command and args
    const command = args.shift().toLowerCase();                                   //shift to lower case for ease of use
    

    //remove on public (remove up to //to here)
    //if(command === "say") { //make the bot say something
      //  const sayMessage = args.join(" "); //join message together again for 1 arg.
       // message.delete().catch(O_o=>{}); //delete command message if possible
       // message.channel.send(sayMessage); //say the message
     // }
    //to here
  
    if(command === "links") { //a command for displaying links to all of Alex's stuff
    message.channel.send("instagram: <https://instagram.com/stupidstupidshirts/>\ntwitch stream: <https://www.twitch.tv/stupidstupidshirts/>\ntwitter: <https://twitter.com/Stupid_shirts/>\nshirts: <https://stupidstupidshirts.com/>")
    //say the links text
    }

    if (command === "rules") { //a command for displaying the rules
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: "A.S.S sponsored message",
              icon_url: client.user.avatarURL
            },
            title: "dont get caught horsin around :horse:",
            fields: [{
                name: "rule 1:",
                value: "dont insult Stu"
              },
              {
                name: "rule 2:",
                value: "no NSFW images, im baby and so r u"
              },
              {
                name: "rule 3:",
                value: "don't ask for free stuff, i do giveaways"
              },
              {
                name: "rule 4:",
                value: "try not to spam pls"
              },
              {
                name: "rule 5:",
                value: "be nice"
              },
              {
                name: "rule 6:",
                value: "have fun"
              }
            ],
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Alex's Stupid Shirts LLC in collaboration with the Alex's Stupid Software team"
            }
          }
        });
    }
    
    if (command === "regulars"){
        let role = message.guild.roles.find("name", "Regulars")
        var rList = role.members.array(); //array of all Regulars
        var userList = ""; 

        for(i = 0; i < rList.length; i ++){
          var cUser = rList[i].displayName //get user's display name
          if (i == rList.length - 1){
            userList += cUser.toLowerCase() //last name on list add to string
          }
          else{
          userList += cUser.toLowerCase() + ", " //add name to string
          }
        }

        message.channel.send("nice squad: " + userList); //send the string
    }

    if (command === "superregulars"){
      let role = message.guild.roles.find("name", "Super Regular")
      var srList = role.members.array(); //array of all super Regulars
      var userList = ""; 

      for(i = 0; i < srList.length; i ++){
        var cUser = srList[i].displayName //get user's display name
        if (i == srList.length - 1){
          userList += cUser.toLowerCase() //last name on list add to string
        }
        else{
        userList += cUser.toLowerCase() + ", " //add name to string
        }
      }

      message.channel.send("extra nice squad: " + userList); //send the string
  }

    if (command === "pet"){
      if (petNum < 10){
        petNum++;
        updateHappy();
        petHour = hour;
        //message.channel.send("happiness: " + happyBar + "\nhealth: " + healthBar);
        message.channel.send("uwu")
      }
      else {
        message.channel.send("Stu is content, come back later.");
      }
    }

    if (command === "feed"){
      if (fedNum < 10){
        fedNum++;
        updateHealth();
        fedHour = hour;
        //message.channel.send("happiness: " + happyBar + "\nhealth: " + healthBar);
        message.channel.send("monch")
      }
      else {
        message.channel.send("Stu is full, come back later.");
      }
    }

    if(command === "stu"){
      message.channel.send("happiness: " + happyBar + "\nhealth: " + healthBar + "\nthanks for checking on me!");
    }
    
    if(command === "stutime"){
      var designation
      var tempHour
      
      if (minute < 10){
        minute = "0" + minute
      }
    
      if (hour < 12){
        tempHour = hour
        designation = "am"
      }
      if (hour > 12){
        tempHour = hour - 12
        designation = "pm"

      }
      
      message.channel.send("it is currently " + tempHour + ":" + minute + " " + designation + " at A.S.S headquarters");
      
    }
    if (command === "kiss"){
      var rChance = Math.floor(Math.random() * 200)
      
      if (rChance == 7){
        message.channel.send("i am flattered but i am currently taken by @THECalpal#5500");
      }
      else{
      message.channel.send("mwah :heart:");
      if (petNum < 10){
        petNum++;
        updateHappy();
      }
    }
    }
    if (command === "pee"){
      message.channel.send("banned");
    }
    if (command === "piss"){
      message.channel.send("banned")
    }
    if (command === "shid"){
      message.channel.send("https://gyazo.com/b779ce218d6fe64ea5534372252e8cb7")
    }

    if (command === "commands"){
      message.channel.send("current commands: !links, !rules, !pet, !feed, !stu, !stutime, !kiss, !regulars, !superregulars, !serverpop");
    }

    if (command === "frick"){
      message.channel.send("no swer please");
    }
    if (command === "ded"){
      message.channel.send("https://cdn.discordapp.com/attachments/639169397474459649/639615204673454090/image0.jpg")
    }
    if (command === "furry"){
      message.delete().catch(O_o=>{});
      message.channel.send("There is no one single definition of what a furry is. Even within the furry fandom, people cannot always agree on just what makes a person a furry or not. Some would argue that to be a furry, you must think and talk like one (i.e. use furry specific words and phrases). Even if you go to conventions, wear a fursuit, draw the art, writes the stories etc but don't talk using furry lingo, you're not a furry. Basically, someone that may walk the walk but doesn’t talk the talk. Others would argue that even liking anthropomorphic creatures makes you a furry. You may have no idea the furry fandom exists or have ever heard of a furry convention, let alone any of the websites; simply liking 'anthro' critters makes you a furry. The way I see it, if or if you don’t consider yourself a furry is a matter of personal opinion. As with any hobby, most furries are normal people just like anyone you'll meet at work/school or going to/from work/school or anywhere. Then there is the small percent that are hard core fans and have taken what for most is a hobby and perverted it (sometimes in an all to literal sense). As is with so many other things in life, the few that take it too far tend to be the loudest. The silent majority are often forced into silence by the loud majority for fear that people will label them as being in the same class as the minority that have perverted it. One unfortunate side effect of the internet and the relative anonymity that some sites grant their users is people are able to engage in activities (even if only on a virtual level) that they would never even consider doing in real life. An example of this is trolls of message boards that say things to people they’d never say to them in person. I think a lot of the stereotypes associated with furries are because of this. In conclusion, as with any hobby, there are some furries that have taken it too far and/or perverted what for many is a fun harmless hobby.")

    }
    if (command === "john"){
      message.channel.send("excuse me, it's jon. thank you")
    }
    if (command === "serverpop"){
      message.channel.send("there are " + message.guild.memberCount + " lovely people on the stuver")
    }
    if (command === "woohee"){
      message.channel.send("wee hoo")
    }
    if (command === "reviews"){
      message.channel.send("https://gyazo.com/04e9fb6504ea10c29be2937f017a431f")
    }
    if (command == "gay"){
      message.channel.send("no u")
    }
    if (command == "alexis"){
      message.channel.send("https://cdn.discordapp.com/attachments/639203849889906699/643546490043760690/image0.jpg")
    }
    if (command == "historyfact"){
      message.channel.send("https://www.history.com/this-day-in-history");

    }
    
    //if (command == "stream"){
      

     // message.channel.send("")

    //}




 //Random Chance to be a Regular (KEEP AT THE BOTTOM)
function Regular(){
let roleR = message.guild.roles.find("id", "639277446298075146"); //Find the Regulars role
let roleR2 = message.guild.roles.find("id", "641831471157477387");
let roleR3 = message.guild.roles.find("id", "641831568700211212");
let sender = message.member;
if (sender.roles.has(roleR.id)) {
  
  if (sender.roles.has(roleR2.id)){
    
    if(sender.roles.has(roleR3.id)){
      return;
    }
    else{
      const rngNumber = Math.ceil(Math.random() * 4200); //get a number between 1 and 4200
      if(rngNumber == 242)  { //if you hit a 242
        sender.addRole(roleR3.id) //give them the regular role
        message.channel.send("dude, mega super nice") //say nice on the 242!
      }
    }
  }
  
  else{
    const rngNumber = Math.ceil(Math.random() * 690); //get a number between 1 and 690
    if(rngNumber == 420)  { //if you hit a 420
        sender.addRole(roleR2.id) //give them the regular role
        message.channel.send("dude, super nice") //say nice on the 420!
    }
  }


    }  
  else {
    const rngNumber = Math.ceil(Math.random() * 420); //get a number between 1 and 420
    if(rngNumber == 69)  { //if you hit a 69
        sender.addRole(roleR.id) //give them the regular role
        message.channel.send("nice") //say nice on the 69!
    }

  }
}});

function updateHappy() {
  if (petNum == 0){
    happyBar = bar0;
  }
  else if (petNum == 1){
    happyBar = bar1;
  }
  else if (petNum == 2){
    happyBar = bar2;
  }
  else if (petNum == 3){
    happyBar = bar3;
  }
  else if (petNum == 4){
    happyBar = bar4;
  }
  else if (petNum == 5){
    happyBar = bar5;
  }
  else if (petNum == 6){
    happyBar = bar6;
  }
  else if (petNum == 7){
    happyBar = bar7;
  }
  else if (petNum == 8){
    happyBar = bar8;
  }
  else if (petNum == 9){
    happyBar = bar9;
  }
  else if (petNum == 10){
    happyBar = bar10;
  }
}

function updateHealth() {
  if (fedNum == 0){
    healthBar = bar0;
  }
  else if (fedNum == 1){
    healthBar = bar1;
  }
  else if (fedNum == 2){
    healthBar = bar2;
  }
  else if (fedNum == 3){
    healthBar = bar3;
  }
  else if (fedNum == 4){
    healthBar = bar4;
  }
  else if (fedNum == 5){
    healthBar = bar5;
  }
  else if (fedNum == 6){
    healthBar = bar6;
  }
  else if (fedNum == 7){
    healthBar = bar7;
  }
  else if (fedNum == 8){
    healthBar = bar8;
  }
  else if (fedNum == 9){
    healthBar = bar9;
  }
  else if (fedNum == 10){
    healthBar = bar10;
  }
}
function heeHaw (){
    client.channels.find("id", "639160062916689947").send("hee haw");
}

/*
function getNextSunday() {
  var now = new Date();
  var nextSunday = new Date();
  nextSunday.setDate(now.getDate() + (6 - 1 - now.getDay() + 7) % 7 + 1);
  nextSunday.setHours(20, 0, 0, 0);
  return nextSunday;
}
*/