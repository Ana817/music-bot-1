function permissions(msg, useVoice) {
	const permissions = []
	const bot = msg.guild.member(msg.client.user)
	const voiceChannel = msg.member.voice.channel
	const textChannel = bot.permissionsIn(msg.channel)
	const formatToStr = () => permissions.join(", ").replace(/,(?=[^,]*$)/, " e")
	
	if (!textChannel.has("EMBED_LINKS")) permissions.push("enviar links")
	if (!textChannel.has("USE_EXTERNAL_EMOJIS")) permissions.push("usar emojis externos")
	if (useVoice && voiceChannel) {
		const voicePermissions = voiceChannel.permissionsFor(bot)
		if (!voicePermissions.has("CONNECT")) permissions.push("conectar")
		if (!voicePermissions.has("SPEAK")) permissions.push("falar")
	}
	
	if (!permissions.length) return true
	msg.channel.send(`Eu não tenho permissão para \`${formatToStr()}\`!`).catch(() => null)
}

module.exports = permissions