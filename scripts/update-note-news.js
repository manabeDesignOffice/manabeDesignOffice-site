const fs = require("fs");
const https = require("https");
const xml2js = require("xml2js");

const RSS_URL = "https://note.com/manabedesign2026/rss";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

(async () => {
  try {
    const xml = await fetchText(RSS_URL);
    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });

    const items = parsed.rss.channel.item || [];
    const normalized = Array.isArray(items) ? items : [items];

    const news = normalized.map(item => ({
      title: item.title,
      link: item.link,
      date: new Date(item.pubDate).toISOString().slice(0, 10)
    }));

    fs.writeFileSync("news.json", JSON.stringify(news, null, 2), "utf-8");
    console.log("news.json updated");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
