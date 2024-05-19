const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = 3000;

cloudinary.config({
  cloud_name: "dcqqec7wa",
  api_key: "417674483335429",
  api_secret: CLOUDINARY_API_SECRET, // Replace with your actual API secret
});

app.use(cors());

app.get("/api/images", async (req, res) => {
  try {
    const { folder } = req.query; // Get the folder name from query parameters
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 500,
    });

    const fileNames = result.resources.map((resource) => resource.public_id);
    res.json(fileNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
