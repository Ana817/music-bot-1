const youtube = require("./youtube.js")

function getType(args) {
	const url = args[0]
	const searchStr = args.join(" ")
	const playlistId = youtube.getPlaylistId(url)
	const videoId = youtube.getVideoId(url)
	
	if (youtube.validate(url)) {
		if (playlistId) return { value: "ytlist", id: playlistId[0] }
		if (videoId) return { value: "ytvideo", id: videoId[0] }
	}
	
	return {
		value: "search",
		string: searchStr
	}
}

module.exports = getType