require('dotenv').config();
const discord = require("discord.js");
const { Intents } = require("discord.js");
const fs = require("fs");
const color = require("kleur");
const client = new discord.Client({ 
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
	]
});

client.commands = new discord.Collection();
client.registeredCommands = [];

const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
functionFiles.forEach(func => {
    require(`./functions/${func}`)(client);
    console.log(`${color.bold().green("[LOADED]")} ${color.white("Function")} ${color.yellow(func)}`);
});

client.on("interactionCreate", interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (command) command.run(client, interaction);
});

client.login(process.env.TOKEN);
