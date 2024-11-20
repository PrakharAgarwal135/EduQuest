const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseProgress = new Schema({
  courseID: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  completedVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

module.exports = mongoose.model("CourseProgress", courseProgress);
