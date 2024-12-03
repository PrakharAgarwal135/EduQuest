const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");
const mongoose = require("mongoose");

// initiating the razprpay order and capturing the payment
exports.capturePayment = async (req, res) => {
  // get courses and userId
  const { courses } = req.body;
  const userId = req.user.id;

  // validation
  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "Please Provide Course ID",
    });
  }

  let total_amount = 0;

  for (const course_id of courses) {
    let course;
    try {
      // Find the course by its ID
      course = await Course.findById(course_id);

      // validation
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could not find the Course",
        });
      }

      // check if user already paid for the course
      const uid = new mongoose.Types.ObjectId(String(userId));
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already Enrolled",
        });
      }

      // Add the price of the course to the total amount
      total_amount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // order create
  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not initiate order.",
    });
  }
};

// verify signature of razorpay and server
exports.verifyPayment = async (req, res) => {
  try {
    // this syntax retrieves the info if it exists on req.body. Otherwise, it safely returns undefined.
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;

    const userId = req.user.id;

    // validation
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }

    // verify the integrity of the payment
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // if both match then enroll the students
      await enrollStudents(courses, userId, res);
      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// send mail for payment successful
exports.sendPaymentSuccessful = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the details",
    });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        amount / 100,
        paymentId,
        orderId,
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res.status(400).json({
      success: false,
      message: "Could not send email",
    });
  }
};

// enroll the student in the courses and send enrollment mail
const enrollStudents = async (courses, userId, res) => {
  // validation
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Course ID and User ID",
    });
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          error: "Course not found",
        });
      }
      console.log("Updated course: ", enrolledCourse);

      // assigning the course progress as soon a course is assigned
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      console.log("Enrolled student: ", enrolledStudent);

      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Email sent successfully: ", emailResponse.response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};
