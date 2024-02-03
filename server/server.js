const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const path = require("path");
const { signUp } = require("./controllers/authController");
const authRoutes = require("./routers/authRoutes");
const userRoutes = require("./routers/userRoutes");
const postRoutes = require("./routers/postRoutes");
const { createPost } = require("./controllers/postController");
const { verifyToken } = require("./middleware/authMiddleware");
const User = require("./models/User");
const Post = require("./models/Post");
// const { users, posts } = require("./data/data.js");

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

require("dotenv").config();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
const withFileUpload = (path, handler) => app.post(path, verifyToken, upload.single("picture"), handler);

withFileUpload("/auth/signUp", signUp);
withFileUpload("/posts", createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Server setup
const port = process.env.PORT || 6001;
const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  })
  .catch((err) => console.log(err));
