// DEPENDENCIES
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const FlashCard = require("../models/flashcard.js");
const express = require("express");
const router = express.Router();

// Middleware
router.use(express.static(path.join(__dirname, "public")));
router.use(express.urlencoded({ extended: true })); // ✅ Parse form data
router.use(express.json()); // ✅ Parse JSON requests
router.use(methodOverride("_method")); // ✅ Use method-override for PUT & DELETE
router.use(morgan("dev")); // ✅ Logger

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}!`)
});

//FLASHCARDS ROUTES
//****************************************************************************************/
router.get("/flashcards", async (req, res) => {
    console.log('Flashcards User Page');
    const allFlashCards = await FlashCard.find();
    console.log(allFlashCards.length);
    res.render("flashcards.ejs", { flashcards: allFlashCards })
    
});

router.get("/admin/flashcards", async (req, res) => {
    const allFlashCards = await FlashCard.find();
    console.log(allFlashCards.length);
    res.render("admin/flashcards/index.ejs", { flashcards: allFlashCards })
    
});


router.get("/admin/flashcards/:cardId/edit", async (req, res) => {
    const foundCard = await FlashCard.findById(req.params.cardId)
    console.log(foundCard)
    res.render("admin/flashcards/edit.ejs", {
        flashCard: foundCard,
    });
});


router.post("/admin/flashcards", async (req, res) => {
    console.log(`Adding New Flashcards`,req.body);  
    await FlashCard.create(req.body);
    res.redirect("../../admin/flashcards")
})
router.put("/admin/flashcards/:cardId", async (req, res) => {
    console.log('PUT Data',req.params);
    await FlashCard.findByIdAndUpdate(req.params.cardId, req.body);
    res.redirect("../../admin/flashcards")
});


// Delete Flashcard
router.delete("/admin/flashcards/:cardId", async (req, res) => {
    try {
      console.log("DELETE Data", req.params);
      await FlashCard.findByIdAndDelete(req.params.cardId);
      res.redirect("/admin/flashcards");
    } catch (err) {
      res.status(500).send("Error deleting flashcard");
    }
  });

router.get("/admin/flashcards/new", async (req, res) => {
    // console.log(`Welcome to Admin Page`);
    res.render("admin/flashcards/new.ejs")
});



module.exports = router;