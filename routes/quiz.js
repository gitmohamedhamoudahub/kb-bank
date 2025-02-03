// DEPENDENCIES
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const Quiz = require("../models/quiz.js");
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



//QUIZ ROUTES
//****************************************************************************************/

router.get("/quiz", async (req, res) => {
    res.render("quiz.ejs")
});

router.get("/admin/quiz", async (req, res) => {
    console.log('Quiz Index');
    const allQuiz = await Quiz.find();
    console.log(allQuiz.length);
    res.render("admin/quiz/index.ejs", { quiz: allQuiz })
});
   
router.get("/admin/quiz/new", async (req, res) => {
    console.log(`Welcome to Quiz Admin Page`);
    res.render("admin/quiz/new.ejs")
});
router.post("/admin/quiz", async (req, res) => {
    console.log(`Adding New Quiz Question`,req.body);  
    const { question,
        
         answerIndex } = req.body;
    const myOptions = [req.body.options1,req.body.options2,req.body.options3,req.body.options4 ];
    console.log('My Options Array',myOptions);
    const newQuiz = new Quiz({ question,options: myOptions, answerIndex });
    console.log(`Adding New Quiz Question, ${newQuiz}`);
    await Quiz.create(newQuiz);
    res.redirect("../../admin/Quiz")
})

router.get("/admin/quiz/:cardId/edit", async (req, res) => {
    console.log(`Editing Quiz Question with ID: ${req.params.cardId}`);  // log the id of the card being edited.
    const foundQuiz = await Quiz.findById(req.params.cardId)
    console.log(foundQuiz)
    res.render("admin/quiz/edit.ejs", {
        quiz: foundQuiz,
    });
});


router.put("/admin/quiz/:cardId", async (req, res) => {
    console.log('Quiz PUT Data',req.params);
    await Quiz.findByIdAndUpdate(req.params.cardId, req.body);
    res.redirect("../../admin/quiz")
});

router.delete("/admin/quiz/:cardId", async (req, res) => {
    console.log('DELETE Quiz Data',req.params);
    await Quiz.findByIdAndDelete(req.params.cardId)
    res.redirect("../../admin/quiz")
});



module.exports = router;