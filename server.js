// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // require mongoose package
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config();
const path = require('path');
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
app.get("/flashcards", async (req, res) => {
    res.render("home.ejs")
});
app.get("/quiz", async (req, res) => {
    res.render("home.ejs")
});
app.get("/fact", async (req, res) => {
    res.render("home.ejs")
});

//******************************************************* */
// ADMIN ROUTES - Admin dashboard routes.

app.get("/admin", async (req, res) => {
    console.log(`Welcome to Admin Page`);
    res.render("admin/home.ejs")
});


app.get("/admin/fact", async (req, res) => {
    console.log(`Welcome to Admin Page`);
    res.render("admin/home.ejs")
});

app.get("/admin/quiz", async (req, res) => {
    console.log(`Welcome to Admin Page`);
    res.render("admin/quiz/index.ejs")
});

app.get("/admin/flashcards", async (req, res) => {
    console.log(`Welcome to Admin Page`);
    res.render("admin/flashcards/index.ejs")
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