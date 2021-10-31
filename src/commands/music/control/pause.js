const config = {
	name: "pause",
	usage: ".pausar",
	description: "Pausa a música que esta tocando!",
	execute: pause,
	aliases: [
		"pausar",
		"pausa"
	]
}

function pause(client, msg, args) {
	const serverQueue = client.queue.get(msg.guild.id)
	
	if (!serverQueue || !serverQueue.songs.length) return msg.channel.send("Não tem nenhuma música tocando para pausar!")
	if (serverQueue.dispatcher.paused) return msg.channel.send("A música já está pausada!")
	
	serverQueue.dispatcher.pause()
	msg.channel.send("A música foi pausada!")
}

module.exports = config;