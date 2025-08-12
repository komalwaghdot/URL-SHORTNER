const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");
const router = express.Router();

// POST /api/shorten
router.post("/shorten", async (req, res) => {
  const { original_url } = req.body;
  if (!original_url) return res.status(400).json({ error: "URL is required" });

  try {
    let short_code = shortid.generate();
    const newUrl = await Url.create({ original_url, short_code });
    res.json({ short_url: `${process.env.BASE_URL}/${short_code}` });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});


// GET /api/urls - List all shortened URLs (Admin page)
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // latest first
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET /:shortcode
router.get("/:shortcode", async (req, res) => {
  try {
    const url = await Url.findOne({ short_code: req.params.shortcode });
    if (!url) return res.status(404).json({ error: "URL not found" });

    url.visit_count += 1; // count visits
    await url.save();

    return res.redirect(url.original_url);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});




module.exports = router;
