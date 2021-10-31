const ytdl = require("ytdl-core")
const config = {
	name: "play",
	description: "Toca uma música que você deseja!",
	usage: ".play [link/nome-da-musica]",
	useVoice: true,
	execute: play,
	aliases: [
		"tocar",
		"playnow",
		"play-now",
		"p",
		"t"
	]
}

async function play(client, msg, args) {
	const { queue, youtube, getType } = client.util
	const voiceChannel = msg.member.voice.channel
	let serverQueue = queue(client, msg, args)

	if (!voiceChannel) return msg.channel.send("Você precisa estar conectado em um canal de voz!")
	if (!args.length) return msg.channel.send("Não sabe como usar o comando?!\nUse **.tocar [link/nome-da-música]**, veja o exemplo:\n\n`.play https://youtu.be/dQw4w9WgXcQ\n.play Rick Astley - Never Gonna Give You Up (Video)`")
	if (voiceChannel.id !== serverQueue.channel.id) return msg.channel.send("Você precisa estar no mesmo canal de voz que estou!")
	if (voiceChannel.full) return msg.channel.send("Este canal está lotado!")

	const type = getType(args)

	switch (type.value) {
		case "ytlist": return manager(serverQueue, msg, await youtube.getPlaylist(type.id))
		case "ytvideo": return manager(serverQueue, msg, await youtube.getVideo(type.id))
		case "search": return manager(serverQueue, msg, await youtube.search(type.string))
	}
}

function manager(serverQueue, msg, value) {
	serverQueue.songs = serverQueue.songs.concat(value.songs)

	if (!value.pass) return msg.channel.send(value.errorMessage)
	if (!serverQueue.dispatcher)  {
		player(serverQueue, msg)
		return msg.channel.send(`**Tocando** ${value.name}`)
	}
	
	msg.channel.send(`**Adicionado a fila** ${value.name}`)
}

async function player(serverQueue, msg) {
	try {
		const stream = ytdl(serverQueue.songs[0].url, {
			filter: "audioonly",
			quality: "highestaudio",
			type: "opus"
		})

		serverQueue.connection = await serverQueue.channel.join()
		serverQueue.dispatcher = serverQueue.connection.play(stream, {
			volume: serverQueue.status.volume,
			bitrate: 512000
		})
		
		serverQueue.dispatcher.on("speaking", value => serverQueue.status.playing = Boolean(value))
		serverQueue.dispatcher.on("start", () => msg.client.util.activity(serverQueue))
		serverQueue.dispatcher.on("finish", async () => {
			msg.client.util.activity(serverQueue)
			
			if (!serverQueue.status.loop) serverQueue.songs.shift()
			if (serverQueue.status.loop === "queue") {
				serverQueue.songs.push(serverQueue.songs[0])
				serverQueue.songs.shift()
			}
			if (!serverQueue.songs.length) {
				serverQueue.status.playing = false
				serverQueue.dispatcher = null
				return
			}

			await stream.destroy()
			await serverQueue.dispatcher.destroy()

			player(serverQueue, msg)
		})
	} catch (error) {
		msg.channel.send("Desculpe, ocorreu um erro ao tocar a música!")
		serverQueue.channel.leave()
		throw new Error(error)
	}
}

module.exports = config