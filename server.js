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
const Fact = require('./models/fact.js');

app.use(express.static(path.join(__dirname, 'public')));

const flashCard = require('./routes/flashcard.js');
app.use(flashCard);

const quiz = require('./routes/quiz.js');
app.use(quiz);

const fact = require('./routes/fact.js');
app.use(fact);

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






// PORT STUFF!
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening On Port: ", PORT);
});