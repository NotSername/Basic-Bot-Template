const discord = require("discord.js");
const color = require("kleur");

module.exports = {
    name: "asda",
    description: "asda",
    options: [{
        "type": "string",
        "name": "text",
        "description": "Asda is the best store.",
        "required": true
    }],
    run: async (client, interaction) => {
        try {
            const pain = interaction.options.getString("text");
            interaction.reply(pain);
        } catch(err) {
            console.log(`${color.bold().red("[ERROR]")} ${color.white(err)}`);
        }
    }
}
