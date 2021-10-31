const config = {
	name: "ready",
	execute: ready
}

function ready(client) {
	console.log(`${client.user.username} -- Online!\n`)
	setInterval(() => client.user.setActivity(`${client.guilds.cache.size} servidores!`, { type: 'STREAMING' }), 30*1000)
}

module.exports = config