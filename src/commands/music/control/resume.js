const config = {
	name: "resume",
	usage: ".resumir",
	description: "Volta a tocar a música pausada!",
	execute: resume,
	aliases: [
		"resumir"
	]
}

function resume(client, msg, args) {
	const serverQueue = client.queue.get(msg.guild.id)
	
	if (!serverQueue || !serverQueue.songs.length) return msg.channel.send("Não tem nenhuma música tocando para resumir!")
	if (!serverQueue.dispatcher.paused) return msg.channel.send("A música já está tocando!")
	
	serverQueue.dispatcher.resume();
	msg.channel.send("A música foi resumida!")
}

module.exports = config;