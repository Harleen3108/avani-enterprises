const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const LinkClick = require("../models/LinkClick");
const auth = require("../middleware/auth");
const axios = require("axios");

// Get geolocation data from IP (using free service)
async function getGeoLocation(ip) {
  try {
    if (ip === "::1" || ip === "127.0.0.1") {
      return { country: "Local", city: "Local" };
    }
    const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 5000,
    });
    return {
      country: response.data.country_name || "Unknown",
      city: response.data.city || "Unknown",
    };
  } catch (error) {
    return { country: "Unknown", city: "Unknown" };
  }
}

// Get all active links
router.get("/", async (req, res) => {
  try {
    const links = await Link.find().sort({ order: 1, createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Error fetching links", error: error.message });
  }
});

// ⭐ IMPORTANT: More specific routes MUST come before generic /:id routes!

// Get all clicks (admin) - MUST be before /:id route
router.get("/clicks/all", auth, async (req, res) => {
  try {
    const clicks = await LinkClick.find().sort({ createdAt: -1 });
    res.json(clicks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clicks", error: error.message });
  }
});

// Track social media click - MUST be before /:id route
router.post("/social-clicks", async (req, res) => {
  try {
    const { platform } = req.body;

    if (!platform) {
      return res.status(400).json({ message: "Platform is required" });
    }

    // Get IP address
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    // Get geolocation
    const geo = await getGeoLocation(ip);

    // Create click record for social media (using LinkClick model for consistency)
    const click = new LinkClick({
      linkTitle: `Social: ${platform}`,
      userAgent: req.headers["user-agent"],
      country: geo.country,
      city: geo.city,
      referrer: req.body.referrer || req.headers.referer || "",
      ipAddress: ip,
      platform: platform, // Add platform field for tracking
    });

    await click.save();
    res.json({ message: "Social click recorded" });
  } catch (error) {
    res.status(500).json({ message: "Error recording social click", error: error.message });
  }
});

// Get single link
router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Error fetching link", error: error.message });
  }
});

// Create link (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { title, url, description, icon, color, isActive } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: "Title and URL are required" });
    }

    const link = new Link({
      title,
      url,
      description,
      icon: icon || "Link",
      color: color || "#3b82f6",
      isActive: isActive !== false,
      order: 0,
    });

    await link.save();
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: "Error creating link", error: error.message });
  }
});

// Update link (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, url, description, icon, color, isActive, order } = req.body;

    const link = await Link.findByIdAndUpdate(
      req.params.id,
      {
        title,
        url,
        description,
        icon,
        color,
        isActive,
        order,
      },
      { new: true }
    );

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Error updating link", error: error.message });
  }
});

// Delete link (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // Also delete all clicks for this link
    await LinkClick.deleteMany({ linkId: req.params.id });

    res.json({ message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting link", error: error.message });
  }
});

// Track link click
router.post("/:id/click", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // Get IP address
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    // Get geolocation
    const geo = await getGeoLocation(ip);

    // Create click record
    const click = new LinkClick({
      linkId: link._id,
      linkTitle: link.title,
      userAgent: req.headers["user-agent"],
      country: geo.country,
      city: geo.city,
      referrer: req.body.referrer || req.headers.referer || "",
      ipAddress: ip,
    });

    await click.save();

    // Increment click count on link
    link.clickCount = (link.clickCount || 0) + 1;
    await link.save();

    res.json({ message: "Click recorded" });
  } catch (error) {
    res.status(500).json({ message: "Error recording click", error: error.message });
  }
});

// Get all clicks for a link
router.get("/:id/clicks", async (req, res) => {
  try {
    const clicks = await LinkClick.find({ linkId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(clicks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clicks", error: error.message });
  }
});

module.exports = router;
