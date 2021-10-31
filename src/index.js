const walkingTree = require("walking-tree")
const { Client } = require("discord.js")
const config = require("./config.json")
const client = new Client({
	messageCacheMaxSize: 10,
	messageCacheLifetime: 60,
	messageSweepInterval: 10,
	messageEditHistoryMaxSize: 10
})

client.util = require("./utils/index.js")
client.commands = new Map()
client.queue = new Map()

walkingTree("./src/events/").forEach(file => {
	const event = require(file)
	client.on(event.name, event.execute.bind(null, client))
})

walkingTree("./src/commands/").forEach(file => {
	const command = require(file)
	client.commands.set(command.name, command)
	command.aliases.forEach(alias => client.commands.set(alias, command))
})

client.login(config.token)