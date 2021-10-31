const queueModel = {
	dispatcher: null,
	connection: null,
	activity: null,
	channel: null,
	status: {
		playing: true,
		loop: false,
		volume: 1
	},
	songs: []
}

function queue(client, msg, args) {
	const guildId = msg.guild.id
	const voiceChannel = msg.member.voice.channel
	let serverQueue = client.queue.get(guildId)
	
	if (serverQueue) return serverQueue
	if (!voiceChannel) return
	if (!args.length) return
	
	client.queue.set(guildId, JSON.parse(JSON.stringify(queueModel)))

	serverQueue = client.queue.get(guildId)
	serverQueue.channel = voiceChannel

	return serverQueue
}

module.exports = queue