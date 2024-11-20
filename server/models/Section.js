const mongoose = require("mongoose");
const { Schema } = mongoose;

const sectionSchema = new Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SubSection",
    },
  ],
});

module.exports = mongoose.model("Section", sectionSchema);
