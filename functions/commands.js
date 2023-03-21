const fs = require("fs");
const { SlashCommandBuilder } = require('@discordjs/builders');
const color = require("kleur");

module.exports = async (client) => {
    const commandFolder = fs.readdirSync("./commands");
    commandFolder.forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const content = require(`../commands/${dir}/${file}`);
            const command = new SlashCommandBuilder()
            .setName(content.name)
            .setDescription(content.description)
            if (content.options && content.options.length > 0) {
                for(const option of content.options) {
                    if (option.type == "user") {
                        command.addUserOption((o) => o.setName(option.name).setDescription(option.description).setRequired(option.required));
                    } else if (option.type == "integer") {
                        command.addIntegerOption((o) => o.setName(option.name).setDescription(option.description).setRequired(option.required));
                    } else if (option.type == "string") {
                        command.addStringOption((o) => o.setName(option.name).setDescription(option.description).setRequired(option.required));
                    } else if (option.type == "channel") {
                        command.addChannelOption((o) => o.setName(option.name).setDescription(option.description).setRequired(option.required));
                    } else if (option.type == "role") {
                        command.addRoleOption((o) => o.setName(option.name).setDescription(option.description).setRequired(option.required));
                    }
                }
            }
            client.commands.set(content.name, content);
            client.registeredCommands.push(command.toJSON());
            console.log(`${color.bold().green("[LOADED]")} ${color.white("Command")} ${color.yellow(file)}`);
        }
    });

    client.on("ready", async () => {
        client.guilds.cache.map(g => g).forEach((guild) => {
            try {
                    guild.commands.set(client.registeredCommands)
                    .then(commands => {
                        console.log(`${color.bold().green("[COMMANDS]")} ${color.white(`${commands.size} commands loaded`)}`);
                    })
                    .catch(err => console.log(`${color.bold().red("[ERROR]")} ${color.white(err)}`));
            } catch(err) {
                console.log(err);
            }
        });
    });
}
