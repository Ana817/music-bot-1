const config = {
	name: "volume",
	usage: ".volume | .volume [0/100]",
	description: "Altere o volume em que toco as músicas!",
	execute: volume,
	aliases: [
		"vol"
	]
}

function volume(client, msg, args) {
	const serverQueue = client.queue.get(msg.guild.id)
	const value = parseInt(args[0])
	
	if (!serverQueue) return msg.channel.send("Não tem nenhuma música tocando para mudar o volume!")
	if (isNaN(value)) return msg.channel.send(`O volume atual é de ${serverQueue.status.volume * 100}%`)
	if (value < 0 || value > 100) return msg.channel.send("Você só pode ir de 0% a 100%")
	
	serverQueue.status.volume = (value / 100)
	serverQueue.dispatcher.setVolume(serverQueue.status.volume)
	msg.channel.send(`Volume alterado para ${serverQueue.status.volume * 100}%`)
}

module.exports = config;