// DEPENDENCIES!
const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  
    fact: {
      type: String,
      required: [true, "Fact is required"],
      trim: true,
      minlength: [5, "Fact must be at least 5 characters long"]
    },
  
    isTrue: {
      type: Boolean,  
      required: [true, "IS Correct/False are required"]
    }
  });
  
factSchema.index({ fact: 1 });
const Fact = mongoose.model("Fact", factSchema)
module.exports = Fact;