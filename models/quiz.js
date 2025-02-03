// DEPENDENCIES!
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      minlength: [5, "Question must be at least 5 characters long"]
    },
  
    options: {
      type: [String],  
      required: [true, "Options are required"]
    },
  
    answerIndex: {
      type: Number,
      required: [true, "Answer index is required"],
    //   validate: {
    //     validator: function (value) {
    //       return Number.isInteger(value) && value >= 0 
    //       && this.options 
    //       && value < this.options.length;
    //     },
    //     message: "Answer index must be a valid index in the options array"
    //   }
    }
  });
  
quizSchema.index({ question: 1 });
const Quiz = mongoose.model("Quiz", quizSchema)
module.exports = Quiz;