const express = require("express");
const app = express();

require("dotenv").config;
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const database = require("./config/database");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const PORT = process.env.PORT || 4000;

database.connect();
cloudinaryConnect();

app.use(express.urlencoded({ extended: true }));

// this middleware reads the JSON payload from the incoming request body.
// Parses the JSON into a JavaScript object.
// Attaches it to req.body, making it available for your route handlers.
app.use(express.json());

// simplifies the process of handling cookies in HTTP requests
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    // this will be a origin for our frontend
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//routes
app.use("/EduQuest/auth", userRoutes);
app.use("/EduQuest/profile", profileRoutes);
app.use("/EduQuest/course", courseRoutes);
app.use("/EduQuest/payment", paymentRoutes);
app.use("/EduQuest/reach", contactUsRoute);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
