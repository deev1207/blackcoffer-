// models.js
const mongoose = require('mongoose');

// Define the schema
const dataSchema = new mongoose.Schema(
  {
    end_year: {
      type: String,
      default: "",
    },
    intensity: {
      type: Number,
    },
    sector: {
      type: String,
    },
    topic: {
      type: String,
    },
    insight: {
      type: String,
    },
    url: {
      type: String,
      match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Please enter a valid URL"],
    },
    region: {
      type: String,
    },
    start_year: {
      type: String,
      default: "",
    },
    impact: {
      type: String,
      default: "",
    },
    added: {
      type: Date,
    },
    published: {
      type: Date,
    },
    country: {
      type: String,
    },
    relevance: {
      type: Number,
    },
    pestle: {
      type: String,
    },
    source: {
      type: String,
    },
    title: {
      type: String,
    },
    likelihood: {
      type: Number,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create the model
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
