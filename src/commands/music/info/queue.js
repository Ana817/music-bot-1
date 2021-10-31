const { MessageEmbed } = require("discord.js")
const config = {
	name: "queue",
	usage: ".fila | .fila [pagina]",
	description: "Veja toda a fila de músicas!",
	execute: queue,
	aliases: [
		"fila",
		"lista",
		"list"
	]
}

function queue(client, msg, args) {
	const serverQueue = client.queue.get(msg.guild.id)
	let value = parseInt(args[0])
	
	if (isNaN(value)) value = 1
	if (!serverQueue || !serverQueue.songs.length) return msg.channel.send("Não tem nenhuma música na fila para ver!")
	
	const pages = Math.ceil(serverQueue.songs.length / 10)
	const plural = (pages > 1 ? "s" : "")
	
	if (value < 1) return msg.channel.send("Você só pode começar vendo da página 1!")
	if (pages < value) return msg.channel.send(`Essa fila só tem ${pages} página${plural}.`)
	
	const musicList = getMusicList(serverQueue, value)
	const queueEmbed = new MessageEmbed()
		.setTitle("┃ Fila de músicas!")
		.setDescription(`Aqui está a fila de músicas!\nUse \`.fila [pagina]\`, para ver mais!\n\n\`${musicList}\`⠀`)
		.setFooter(`• Pedido por ${msg.author.tag}`, msg.author.avatarURL())
		.setColor("#2f3136")
	
	msg.channel.send(queueEmbed)
}

function getMusicList(serverQueue, value) {
	const newValue = (value * 10)
	let strList = serverQueue.songs
		.slice((newValue - 10), newValue)
		.reduce((strOut, song, index) => strOut += `${newValue + index - 9}. ${song.name}\n`, "")
		
	return strList
}

module.exports = config