const config = {
	name: "loop",
	usage: ".loop | .loop [normal/fila]",
	description: "Deixe a música atual em loop ou até mesmo toda a fila de músicas em loop!",
	execute: loop,
	aliases: [
		"repetir",
		"repeat"
	]
}

function loop(client, msg, args) {
	const mode = args[0]
	const serverQueue = client.queue.get(msg.guild.id)
	const setLoop = (modeLoop, message) => {
		serverQueue.status.loop = modeLoop
		msg.channel.send(message)
	}
	const queueMode = [
		"fila",
		"queue",
		"list",
		"lista"
	]
	const musicMode = [
		"música",
		"musica",
		"music",
		"normal"
	]
	
	if (!serverQueue) return msg.channel.send("Não tem nenhuma música tocando!")
	if (serverQueue.status.loop) return setLoop(false, "O modo loop foi desativado!")
	if (queueMode.includes(mode)) return setLoop("queue", "O modo loop de fila foi ativado!")
	if (musicMode.includes(mode) || !mode) return setLoop("music", "O modo loop de música foi ativado!")
}

module.exports = config;