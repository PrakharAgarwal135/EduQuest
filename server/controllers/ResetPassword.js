const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { passwordUpdate } = require("../mail/templates/passwordUpdate");
const { resetPasswordToken } = require("../mail/templates/resetPasswordToken");

// resetPasswordToken (will send the link to mail for reset password)
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from req body
    const { email } = req.body;

    // check user for this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: ` Email: ${email} is not Registered With Us `,
      });
    }

    // generate token (using this we will fetch the userDetails in next handler)
    const token = crypto.randomBytes(20).toString("hex");

    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail - password reset token
    try {
      const emailResponse = await mailSender(
        user.email,
        "Link for resetting password",
        resetPasswordToken(` ${user.firstName} ${user.lastName}`, `${url}`)
      );
      console.log("Email sent successfully:", emailResponse);
    } catch (error) {
      // If there's an error sending the email
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
      });
    }

    // return response
    return res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

// resetPassword (will reset the password in the db) and send mail for password update
exports.resetPassword = async (req, res) => {
  try {
    // data fetch
    const { password, confirmPassword, token } = req.body;

    // validation
    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // get userDetails using token
    const userDetails = await User.findOne({ token: token });

    // if no entry - invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    // token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    // hash pwd
    const hashedPassword = await bcrypt.hash(password, 10);

    // update pwd
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    // send mail - password updated
    try {
      const emailResponse = await mailSender(
        userDetails.email,
        "Password for your account has been updated",
        passwordUpdate(
          userDetails.email,
          ` ${userDetails.firstName} ${userDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse);
    } catch (error) {
      // If there's an error sending the email
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
