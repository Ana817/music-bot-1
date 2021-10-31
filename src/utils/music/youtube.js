const ytdl = require("ytdl-core")
const ytpl = require("ytpl")
const ytsr = require("ytsr")

const validate = (string) => (/(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be).+/i).test(string)
const getVideoId = (string) => string.match(/(?<=v=|\/)[a-zA-Z0-9_\-]{11}(?=&|\/)?/i)
const getPlaylistId = (string) => string.match(/(?<=list=)[a-zA-Z0-9_\-]+(?=&|\/)?/i)

async function getPlaylist(listId, queue) {
	const out = {
		pass: false,
		name: undefined,
		errorMessage: "Esta playlist é privada ou inválida!",
		songs: []
	}
	const list = await ytpl(listId, {
			pages: Infinity,
			limit: Infinity
		})
		.catch(() => ({ items: [] }))

	if (!list.items.length) return out

	out.pass = true
	out.name = list.title

	for (const item of list.items) {
		out.songs.push({
			name: item.title,
			url: item.url
		})
	}

	return out
}

async function getVideo(videoId) {
	const out = {
		pass: false,
		name: undefined,
		errorMessage: "Este video é privado ou inválido!",
		songs: []
	}
	const video = await ytdl.getInfo(videoId)
		.then(value => value.videoDetails)
		.catch(() => null)

	if (!video) return out

	out.pass = true
	out.name = video.title
	out.songs.push({
		name: video.title,
		url: video.video_url
	})

	return out
}

async function search(string, queue) {
	const out = {
		pass: false,
		name: undefined,
		errorMessage: "Não encontrei nenhuma música com esse nome!",
		songs: []
	}
	const getFilters = await ytsr.getFilters(string)
	const filter = getFilters.get("Type").get("Video")
	const result = await ytsr(filter.url, { limit: 1 })
		.then(r => r.items[0])
		.catch(() => null)

	if (!result) return out

	out.pass = true
	out.name = result.title
	out.songs.push({
		name: result.title,
		url: result.url
	})

	return out
}

module.exports = {
	validate,
	getVideoId,
	getPlaylistId,
	getVideo,
	getPlaylist,
	search
}