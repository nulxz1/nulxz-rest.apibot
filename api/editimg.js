module.exports = {
  name: "Edit image",
  desc: "Edit foto sesukamu",
  category: "Imagecreator",
  path: "/imagecreator/editimg?apikey=&text=&url=",
  async run(req, res) {
    const { apikey, text, url } = req.query;
    if (!apikey || !global.apikey.includes(apikey)) return res.json({ status: false, error: "Apikey invalid" });
    if (!text) return res.json({ status: false, error: 'Missing text' });
    if (!url) return res.json({ status: false, error: "Url is required" });
    try {
      const ap = await fetchJson(`https://api.platform.web.id/editimg?imageUrl=${url}&prompt=${text}`)
      res.status(200).json({ status: true, result: ap.image.url });
    } catch (e) {
      res.status(500).json({ status: false, error: e.message });
    }
  }
}
