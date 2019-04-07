//setup
const Discord = require("discord.js");
var client = new Discord.Client()
client.login(process.env.TOKEN)
var prefix = ("/");
var adminprfix= ("//")
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', function(member){
	member.createDM().then(function (channel){
		return channel.send('Bienvenue ' + member.displayName)
	}).catch(console.error)
});

//commands
client.on('message', message => {
	let args = message.content.split(" ").slice(1);

	if(message.content.startsWith(prefix +"say")) {
		message.delete()
		message.channel.send(args.join(" "))
	}


	if(message.content === '/ping') {
		console.log(message.author)
		message.delete();
		message.channel.send("Wait please, loading latency...").then(m => m.edit(`${message.author} 🏓 Pong!  (latency is ${m.createdTimestamp - message.createdTimestamp}ms, API Latency is: ${Math.round(client.ping)}ms)`).catch(err => {
	return message.channel.send("Une erreur est survenue... Veuillez réessayer plus tard.")
	}));
		message.react("✅");
	}


	if(message.content === prefix + "SERVinfo") {
		var embed = new Discord.RichEmbed()
		.setDescription("Informations about: ", message.guild.name)
		.addField("Owner", message.guild.owner)
		.addField("Created at: ", message.guild.createdAt)
		.addField("Members count: ", message.guild.memberCount)
		.addField("You joined at: ", message.guild.joinedAt)
		.setColor("#FF0000")
	message.channel.send(embed)
	
	}

	if(message.content === prefix + "help") {
		var embed = new Discord.RichEmbed()
		.setDescription("Showing help", true)
		.addField("help", "show this page", true)
		.addField("sond", "make a sondage of what you write", true)
		.addField('say', "say what you write(exemple: if you write /say hello world the bot will say hello world", true)
		.setColor("#FF0000")
	message.channel.send(embed)
	
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


	if(message.content === "lsA"){
		message.channel.send("./Logo_SondBot.png|./logoportal.png")
	}

	if(message.content.startsWith("chatwithconsol")) {
		if(message.author.id = "382960284135849984") {
			let args = message.content.split(" ").slice(1);
			console.log(args.join())
		}
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

