//setup
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var client = new Discord.Client()
client.login("process.env.TOKEN")
var prefix = ("/");
var adminprfix= ("//")
client.on('ready', () => {
  client.user.setPresence({ game: { name: "/help pour les commandes :)"}, status: 'online' })
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', function(member){
    member.createDM().then(function (channel){
        return channel.send('Bienvenue ' + member.displayName + ' sur notre serveur nous te shouhaitons une bonne journée/soirée et merci de lire le règlement.:) ')
    }).catch(console.error)

});

//commands
client.on('message', message => {
	let args = message.content.split(" ").slice(1);

	if(message.content.startsWith(prefix +"say")) {
		message.delete()
		message.channel.send(args.join(" "))
	}


	if(message.content === prefix + 'ping') {
		console.log(message.author)
		message.delete();
		message.channel.send("Wait please, loading latency...").then(m => m.edit(`${message.author} 🏓 Pong!  (latency is ${m.createdTimestamp - message.createdTimestamp}ms, API Latency is: ${Math.round(client.ping)}ms)`).catch(err => {
	return message.channel.send("Une erreur est survenue... Veuillez réessayer plus tard.")
	}));
		message.react("✅");
	}


	if(message.content === prefix + "s-info") {
		var embed = new Discord.RichEmbed()
		.setDescription("Informations about ", message.guild.name)
		.addField("Owner", message.guild.owner)
		.addField("Created at: ", message.guild.createdAt)
		.addField("Members count: ", message.guild.memberCount)
		.addField("You joined at: ", message.guild.joinedAt)
		.addField("Server Logo:", message.guild.iconURL)
		.addField("Server Acronym: ", message.guild.nameAcronym)
		.addField("Server region: ", message.guild.region)
		.setColor("#FF0000")
	message.channel.send(embed)

	}

	if(message.content === prefix + "help") {
		var embed = new Discord.RichEmbed()
		.setDescription("Showing help", true)
		.addField("help", "show this page", true)
		.addField("sond", "make a sondage of what you write", true)
		.addField("Msond", "same like the SOND but with 3 choices", true)
		.addField("s-info", "show server Informations like the owner of it", true)
		.addField('say', "say what you write(exemple: if you write /say hello world the bot will say hello world", true)
		.addField("!", "affiche une annonce", true)
		.setFooter("prefix is " + prefix)
		.setColor("#FF0000")
	message.channel.send(embed)
	
	}


	if(message.content === adminprfix + "invite") {
		if(message.author.id = "382960284135849984"){
			var embed = new Discord.RichEmbed()
			.addField("Invitation link", "https://discordapp.com/api/oauth2/authorize?client_id=560879666169249792&permissions=8&scope=bot", true)
		message.channel.send(embed)
		}
		
	}
	
	if(message.content.startsWith(prefix + "sond")) {
		message.delete()
		let args = message.content.split(" ").slice(1);
		var embed = new Discord.RichEmbed()
		.addField(args.join(" "), "REACT with :white_check_mark: or :x:")
		.setTimestamp()
	message.channel.send(embed)
	message.react(":white_check_mark:")
	message.react(":x:")
	}

	

	if(message.content.startsWith(prefix + "Msond")) {
		message.delete()
		let args = message.content.split(" ").slice(1);
		var embed = new Discord.RichEmbed()
		.addField(args.join(" "), "REACT with 🔵/⚪/🔴")
		.setTimestamp()
		message.channel.send(embed)
		message.channel.send("make your choice")
	}

	if(message.content === "make your choice") {
		message.react('🔵')
		message.react('⚪')
		message.react('🔴')
	}


	if(message.content === prefix + "stop") {

		if(message.member.voiceChannel){

			if(message.guild.me.voiceChannel) {

				if(message.guild.me.voiceChannelID === message.member.voiceChannelID) {
					message.channel.send("Un instant, je quite le salon")
					message.guild.me.voiceChannel.leave()
				}else {
					message.channel.send("Vous n'êtes pas connecté au même salon que moi ")
				}

			}else {
				message.channel.send("Le bot n'est connecté au aucun salon audio")
			}

		}else {
			message.channel.send("Connecte toi su run salon audio stp")
		}
	}

	if(message.content.startsWith(adminprfix + "setGame")) {
		if(message.author.id = "382960284135849984") {
			let args = message.content.split(" ").slice(1);
			client.user.setPresence({ game: { name: args.join(" ") }, status: 'online' })
			console.log("new game set: " + args.join())
		}
	}

	if(message.content.startsWith(adminprfix + "setAvatar")) {
		if(message.author.id = "382960284135849984") {
			client.user.setAvatar(args.join())
  			.then(user => console.log(`New avatar set!` + args.join()))
  			.catch(console.error);
		}
	}


	if(message.content === adminprfix + "lsA"){
		message.channel.send("./Logo_SondBot.png|./logoportal.png")
	}

	if(message.content.startsWith(adminprfix + "chatwithconsol")) {
		if(message.author.id = "382960284135849984") {
			let args = message.content.split(" ").slice(1);
			message.channel.send("msg send with succes!")
			console.log(args.join())
		}
	}


	if(message.content.startsWith(prefix + "yt")){
		let args = message.content.split(" ").slice(1)
		if(message.member.voiceChannel){
			message.member.voiceChannel.join()
			.then(connection => {
				message.reply("Connection réussi")
				connection.playArbitraryInput(ytdl(args.join()))
				
			})
			.catch(console.log);


		} else {
			message.reply("Vous devez d'abord vous connecter a un salon audio");
		}
	}

	

	if(message.content.startsWith(prefix + "!")) {
		if(!message.member.hasPermission("MENTION_EVERYONE")) {return message.channel.send("Missing permission: MENTION_EVERYONE")} {
			let args = message.content.split(" ").slice(1);
			message.delete()
			message.channel.send(`@everyone, merci de lire la dernière annonce postée par ${message.author}: ` + args.join())
			
			
		}
	}

	if(message.content.startsWith(prefix + "ping-test")){
		message.reply("ping-test en cours envoi des données vers la console")
		console.log("on the server named: ", message.guild.name)
		console.log("Owner: ", message.guild.owner)
		//console.log("this server has ", message.guild.memberCount, "member(s)")
		message.channel.send("data recived by console")
	}
	if(message.content === prefix + "invite"){
		message.channel.send("Voici le liens qui vous permettra de m'inviter: https://discordapp.com/api/oauth2/authorize?client_id=560879666169249792&permissions=8&scope=bot")
	}
	

	if(message.content === adminprfix + "help"){
		if(message.author.id === "382960284135849984") {
			var embed = new Discord.RichEmbed()
			.setDescription("Admin's help page", true)
			.addField("lsA", "Show avatars for the bot", true)
			.addField("setAvatar", "change the avatar of the bot", true)
			.addField("setGame", "set RichPresence for the bot", true)
			.addField("chatwithconsol", "send message into the console", true)
			.setFooter("prefix is " + adminprfix)
			message.channel.send(embed)
		}
	}
})





client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith(prefix + "kick")) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
})
