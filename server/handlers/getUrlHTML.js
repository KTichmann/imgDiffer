const rp = require("request-promise");
const cheerio = require("cheerio");

function getImageText(req, res) {
	const url = req.body.url;
	if (!url) {
		return res.json({
			success: false,
			message: "url cannot be empty"
		});
	}

	rp(url).then(html => {
		const $ = cheerio.load(html);
		const title = $("title").text();
		const description = $("meta[name=description]").attr("content");
		const body = $("body").text();
		return res.json({
			success: true,
			data: { title, description, body: body.replace(/\r?\n|\r|\s\s/g, "") }
		});
	});
}

module.exports = getImageText;
