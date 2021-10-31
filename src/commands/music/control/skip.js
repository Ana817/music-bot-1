const config = {
	name: "skip",
	usage: ".pular | .pular [quantidade]",
	description: "Pula a música atual ou pula um número de musicas determinado!",
	execute: skip,
	aliases: [
		"pular"
	]
}

function skip(client, msg, args) {
	const serverQueue = client.queue.get(msg.guild.id)
	let value = parseInt(args[0])
	const plural = (value > 1 ? "s" : "")

	if (isNaN(value)) value = 1
	if (!serverQueue || !serverQueue.songs.length) return msg.channel.send("Não tem nenhuma música tocando para pular!")
	if (value < 1) return msg.channel.send("Você só pode pular músicas a partir do número 1!")
	if (value > serverQueue.songs.length) return msg.channel.send(`Você só tem ${serverQueue.songs.length} música${plural} na fila para pular!`)
	if (serverQueue.status.loop) {
		if (serverQueue.status.loop === "queue") value--
		const songsCopy = serverQueue.songs.splice(0, value)
		if (serverQueue.status.loop === "queue") serverQueue.songs = serverQueue.songs.concat(songsCopy)
	}

	serverQueue.dispatcher.end()
	msg.channel.send(`Musica${plural} pulada${plural}!`)
}

module.exports = config