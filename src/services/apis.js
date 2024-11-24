const BASE_URL = "http://localhost:4000/EduQuest";

// auth endpoints
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// profile endpoints
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};

// students endpoints for payment
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessful",
};

// course endpoints
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",

  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",

  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",

  CREATE_RATING_API: BASE_URL + "/course/createRating",
};

// ratings and reviews
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

// categories api
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// catalog page
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// contact us api
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

// settings page api
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};
