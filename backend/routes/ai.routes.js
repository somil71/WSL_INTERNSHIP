const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

router.get("/test", (req, res) => {
  res.send("AI route working");
});

// GENERATE ONLY
router.post("/generate-food-ai", aiController.generateFoodAI);

// GENERATE + SAVE
router.post("/generate-food-ai/:foodId", aiController.generateAndSaveFoodAI);

//analyzer
router.put("/admin/restaurants/:id/analyze", aiController.analyzeRestaurantReviews)

router.put(
  "/stores/:id/review",
  aiController.addReview
);

// AI recipe generator (from ingredients)
router.post("/recipe/generate", aiController.generateRecipe);



module.exports = router;