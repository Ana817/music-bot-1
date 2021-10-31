const config = {
	name: "np",
	usage: ".np",
	description: "Veja que música está tocando!",
	execute: nowPlaying,
	aliases: [
		"tocando",
		"nowplaying",
		"now-playing"
	]
}

function nowPlaying(client, msg, args) {
	const serverQueue = client.queue.get(msg.guild.id)
	
	if (!serverQueue || !serverQueue.songs.length) return msg.channel.send("Não tem nenhuma música tocando para ver!")
	
	msg.channel.send(`**Está tocando** ${serverQueue.songs[0].name}`)
}

module.exports = config;