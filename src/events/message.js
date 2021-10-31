const config = {
	name: "message",
	execute: message
}

function message(client, msg) {
	const { permissions, delay } = client.util
	const args = msg.content.trim().slice(1).split(" ")
	const command = args.shift().toLowerCase()
	const cmd = client.commands.get(command)
	
	if (msg.author.bot) return
	if (!msg.guild) return
	if (!msg.content.startsWith("!")) return
	if (!cmd) return
	if (delay(msg)) return
	if (!permissions(msg, cmd.useVoice)) return

	cmd.execute(client, msg, args)
}



module.exports = config