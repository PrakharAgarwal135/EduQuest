const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

// create section
exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    // create section
    const newSection = await Section.create({ sectionName });

    // updating course by pushing object id of section into course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create section , please try again",
      error: error.message,
    });
  }
};

// update section
exports.updateSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, sectionId, courseId } = req.body;

    // data validation
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    // update the data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //   return response
    res.status(200).json({
      success: true,
      message: section,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update section , please try again",
      error: error.message,
    });
  }
};

// delete section
exports.deleteSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, courseId } = req.body;
    console.log(sectionId, courseId);

    // find the course and remove section from it
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }

    // delete sub section
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    // deleting the section
    await Section.findByIdAndDelete(sectionId);

    //find the updated course and return
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //   return response
    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete section , please try again",
      error: error.message,
    });
  }
};
