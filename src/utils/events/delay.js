const delays = []

function delay(msg) {
	const guildId = msg.guild.id
	
	if (delays.includes(guildId)) return msg.channel.send("Espere um pouco para usar comandos!")
	else delays.push(guildId)
	
	setTimeout(() => {
		const index = delays.indexOf(guildId)
		delays.splice(index, (index + 1))
	}, 3 * 1000)
}

module.exports = delay