var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var profileRouter = require("./routes/profile");
var buildingRouter = require("./routes/building");
var roomRouter = require("./routes/room");
var facultyRouter = require("./routes/faculty");
var departmentRouter = require("./routes/department");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/users", usersRouter);
app.use("/building", buildingRouter);
app.use("/room", roomRouter);
app.use("/faculty", facultyRouter);
app.use("/department", departmentRouter);

module.exports = app;
