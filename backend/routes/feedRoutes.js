const express = require("express");
const router = express.Router();

const Feed = require("../models/Feed");
const redisClient = require("../config/redis");


// GET FEEDS
router.get("/", async (req, res) => {
  try {

    const cache = await redisClient.get("feeds");

    if (cache) {

      console.log("Fetched from Redis");

      return res.json({
        source: "redis",
        data: JSON.parse(cache),
      });
    }

    console.log("Fetched from MongoDB");

    const feeds = await Feed.find().sort({ createdAt: -1 });

    await redisClient.set("feeds", JSON.stringify(feeds));

    res.json({
      source: "database",
      data: feeds,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// POST FEED
router.post("/", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message required",
      });
    }

    const feed = await Feed.create({
      message,
    });

    // clear cache
    await redisClient.del("feeds");

    // realtime emit
    const io = req.app.get("io");

    io.emit("newFeed", feed);

    res.status(201).json(feed);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
