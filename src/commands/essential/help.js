const { MessageEmbed } = require("discord.js")
const config = {
	name: "help",
	usage: ".ajuda | .ajuda [comando]",
	description: "Mostra todos os comandos e informações gerais sobre mim!",
	execute: help,
	aliases: [
		"ajuda"
	]
}

function help(client, msg, args) {
	const command = client.commands.get(args[0])
	let helpEmbed = new MessageEmbed()
		.setTitle("┃ Meus comandos!")
		.setDescription("Veja toda minha lista de comandos!\n\n" +
			"`.ajuda - Veja meus comandos!\n" +
			".tocar - De play em uma música!\n" +
			".pular - Pula a música atual!\n" +
			".loop - Deixe a música em loop!\n" +
			".pausar - Pausa a música!\n" +
			".resumir - Volta a tocar música!\n" +
			".volume - Mude o volume da música!\n" +
			".fila - Veja a fila de músicas!\n" +
			".np - Veja o que está tocando!\n" +
			".parar - Parar música e sair!`\n" +
			"⠀")
		.setFooter(`• Pedido por ${msg.author.tag}`, msg.author.avatarURL())
		.setColor("#2f3136")

	if (!command || command.private) return msg.channel.send(helpEmbed)
	
	helpEmbed = new MessageEmbed()
		.setTitle("┃ Informações do comando!")
		.setDescription(`${command.description}\n\n` +
			`**Como usar:** \`${command.usage}\`\n` +
			`**Alternativas:** \`${command.aliases.join(", ")}, ${command.name}.\`\n⠀`)
		.setFooter(`• Pedido por ${msg.author.tag}`, msg.author.avatarURL())
		.setColor("#2f3136")
	
	msg.channel.send(helpEmbed)
}

module.exports = config