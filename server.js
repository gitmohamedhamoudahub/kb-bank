// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // require mongoose package
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config();
const path = require('path');
const FlashCard = require('./models/flashcard.js');
const Quiz = require('./models/quiz.js');

app.use(express.static(path.join(__dirname, 'public')));


// const Book = require("./models/book.js"); // Import the Book Model

// MIDDLEWARE
// Connect mongodb using connection string in the .env file
// Console log connection status at start
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}!`)
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // method override - used to aid in the functionality of a delete.
app.use(morgan("dev")); // morgan logs status of processed requests in our console.


// ROUTES

// HOME / LANDING PAGE - Renders a welcome page in the browser
app.get("/", async (req, res) => {
    res.render("home.ejs")
});

//******************************************************* */
// ADMIN ROUTES - Admin dashboard routes.

app.get("/admin", async (req, res) => {
    console.log(`Welcome to Admin Page`);
    res.render("admin/home.ejs")
});



app.get("/fact", async (req, res) => {
    res.render("home.ejs")
});

app.get("/admin/fact", async (req, res) => {
    console.log(`Welcome to Admin Page`);
    res.render("admin/home.ejs")
});


//QUIZ ROUTES
//****************************************************************************************/

app.get("/quiz", async (req, res) => {
    res.render("quiz.ejs")
});

app.get("/admin/quiz", async (req, res) => {
    console.log('Quiz Index');
    const allQuiz = await Quiz.find();
    console.log(allQuiz.length);
    res.render("admin/quiz/index.ejs", { quiz: allQuiz })
});
   
app.get("/admin/quiz/new", async (req, res) => {
    console.log(`Welcome to Quiz Admin Page`);
    res.render("admin/quiz/new.ejs")
});
app.post("/admin/quiz", async (req, res) => {
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

app.get("/admin/quiz/:cardId/edit", async (req, res) => {
    console.log(`Editing Quiz Question with ID: ${req.params.cardId}`);  // log the id of the card being edited.
    const foundQuiz = await Quiz.findById(req.params.cardId)
    console.log(foundQuiz)
    res.render("admin/quiz/edit.ejs", {
        quiz: foundQuiz,
    });
});






//FLASHCARDS ROUTES
//****************************************************************************************/
app.get("/flashcards", async (req, res) => {
    console.log('Flashcards User Page');
    const allFlashCards = await FlashCard.find();
    console.log(allFlashCards.length);
    res.render("flashcards.ejs", { flashcards: allFlashCards })
    
});

app.get("/admin/flashcards", async (req, res) => {
    const allFlashCards = await FlashCard.find();
    console.log(allFlashCards.length);
    res.render("admin/flashcards/index.ejs", { flashcards: allFlashCards })
    
});


app.get("/admin/flashcards/:cardId/edit", async (req, res) => {
    const foundCard = await FlashCard.findById(req.params.cardId)
    console.log(foundCard)
    res.render("admin/flashcards/edit.ejs", {
        flashCard: foundCard,
    });
});


app.post("/admin/flashcards", async (req, res) => {
    console.log(`Adding New Flashcards`,req.body);  
    await FlashCard.create(req.body);
    res.redirect("../../admin/flashcards")
})
app.put("/admin/flashcards/:cardId", async (req, res) => {
    console.log('PUT Data',req.params);
    await FlashCard.findByIdAndUpdate(req.params.cardId, req.body);
    res.redirect("../../admin/flashcards")
});


app.delete("/admin/flashcards/:cardId", async (req, res) => {
    console.log('DELETE Data',req.params);
    await FlashCard.findByIdAndDelete(req.params.cardId)
    res.redirect("../../admin/flashcards")
});

app.get("/admin/flashcards/new", async (req, res) => {
    // console.log(`Welcome to Admin Page`);
    res.render("admin/flashcards/new.ejs")
});

// INDEX BOOK ROUTE - Renders a page with a list of our book collection

// NEW BOOK ROUTE - Renders form for user to enter new book data.

// DELETE - Removes a book from the db.

// UPDATE - Action that changes previously posted data

// CREATE - Action to create new book entry

// EDIT - Renders form to edit existing book data

// SHOW - Route to render page that shows individual book data.

// PORT STUFF!
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening On Port: ", PORT);
});