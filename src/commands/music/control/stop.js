const config = {
	name: "stop",
	usage: ".parar",
	description: "Para de tocar as músicas e sai do canal!",
	execute: stop,
	aliases: [
		"parar",
		"desconectar",
		"disconnect"
	]
}

function stop(client, msg, args) {
	const serverQueue = client.queue.get(msg.guild.id)
	
	if (!serverQueue) return msg.channel.send("Eu não estou tocando nada para parar de tocar!")
	
	serverQueue.channel.leave()
	msg.channel.send("Adeus!")
}

module.exports = config;