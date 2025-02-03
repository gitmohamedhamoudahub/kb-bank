
// DEPENDENCIES
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const Fact = require("../models/fact.js");
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





//FACT ROUTES
//****************************************************************************************/



router.get("/admin/fact", async (req, res) => {
    console.log('Fact Index');
    const allFacts = await Fact.find();
    console.log(allFacts.length);
    res.render("admin/fact/index.ejs", { fact: allFacts })
});
   
router.get("/admin/fact/new", async (req, res) => {
    console.log(`Welcome to fact Admin Page`);
    res.render("admin/fact/new.ejs")
});
router.post("/admin/fact", async (req, res) => {
    console.log(`Adding New Fact Question`,req.body);  
    const { fact,isTrue } = req.body;
    // const myOptions = [req.body.options1,req.body.options2,req.body.options3,req.body.options4 ];
    // console.log('My Options Array',myOptions);
    // let myBoolean = new Boolean(isTrue);
    const newFact = new Fact({ fact, isTrue });
    // console.log("is true = >",myBoolean);
    console.log(`Adding New Fact Question, ${newFact}`);
    await Fact.create(newFact);
    res.redirect("../../admin/Fact")
})

router.get("/admin/fact/:cardId/edit", async (req, res) => {
    console.log(`Editing Fact Question with ID: ${req.params.cardId}`);  // log the id of the card being edited.
    const foundFact = await Fact.findById(req.params.cardId)
    console.log(foundFact)
    res.render("admin/fact/edit.ejs", {
        fact: foundFact,
    });
});


router.put("/admin/fact/:cardId", async (req, res) => {
    console.log('Fact PUT Data',req.params);
    await Fact.findByIdAndUpdate(req.params.cardId, req.body);
    res.redirect("../../admin/fact")
});

router.delete("/admin/fact/:cardId", async (req, res) => {
    console.log('DELETE Fact Data',req.params);
    await Fact.findByIdAndDelete(req.params.cardId)
    res.redirect("../../admin/fact")
});


module.exports = router;