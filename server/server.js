const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath, URL } = require("url");

const app = express();

// Remove the explicit declaration of __filename and __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({ policy: "cross-origin" })); // for security
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


require("dotenv").config();

const store = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: store }).single("file");

const port = process.env.PORT || 3000;
// database connection

const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
