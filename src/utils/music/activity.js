function activity(serverQueue, forcePass) {
	const { playing } = serverQueue.status
	const verifyChannel = (serverQueue.channel.members.size === 1)

	if (forcePass || verifyChannel) return
	
	serverQueue.activity = clearTimeout(serverQueue.activity)
	serverQueue.activity = setTimeout(() => {
		if (!playing) return serverQueue.channel.leave()
		if (verifyChannel) return serverQueue.channel.leave()

		activity(serverQueue)
	}, 5 * 60 * 1000)
}

module.exports = activity