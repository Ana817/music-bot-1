const config = {
	name: "voiceStateUpdate",
	execute: voiceStateUpdate
}

function voiceStateUpdate(client, oldUser, newUser) {
	const serverQueue = client.queue.get(oldUser.guild.id)
	const isMe = (newUser.id === "bot-id")
	
	if (!serverQueue) return
	if (!isMe && newUser.channelID !== oldUser.channelID) return client.util.activity(serverQueue, true)
	if (newUser.channelID) return 
	
	clearTimeout(serverQueue.activity)
	client.queue.delete(oldUser.guild.id)
}

module.exports = config