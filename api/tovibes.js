module.exports = {
  name: "To Vibes",
  desc: "Image to vibes style",
  category: "Imagecreator",
  path: "/imagecreator/tovibes?apikey=&url=",
  async run(req, res) {
    const { apikey, url } = req.query;
    if (!apikey || !global.apikey.includes(apikey)) return res.json({ status: false, error: "Apikey invalid" });
    if (!url) return res.json({ status: false, error: "Url is required" });
    try {
      const ap = await fetchJson(`https://api.nekolabs.my.id/ai/gemini/nano-banana?prompt=A realistic photo of the character in the picture, standing inside a modern elevator while taking a mirror selfie. 
      The character is holding a smartphone in their right hand, positioned slightly below chest level, angled to capture their upper body in the mirror reflection. 
      Their left hand is relaxed by their side. The elevator interior has metallic walls and mirrors, with cool white lighting from the ceiling. 
      The pose and facial expression are casual, stylish, and confident, as if capturing a trendy elevator vibe photo for social media.&imageUrl=${url}`)
      res.status(200).json({ status: true, result: ap.image.url });
    } catch (e) {
      res.status(500).json({ status: false, error: e.message });
    }
  }
}
