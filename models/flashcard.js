// DEPENDENCIES!
const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,},
    question: {type: String,required: true,},
    answer:   {type: String,required: true,},
    // comma above is just in case I add another... key value pair
});
flashCardSchema.index({ question: 1 });
const FlashCard = mongoose.model("FlashCard", flashCardSchema) // create our model!
module.exports = FlashCard;