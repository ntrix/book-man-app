require("dotenv").config();
const express = require("express");
try {
	const mongoose = require("mongoose");
	mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (e) {
	console.log(e);
}
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const bookRoute = require("./routes/book.route");
const profileRoute = require("./routes/profile.route");
const tranRoute = require("./routes/tran.route");
const authRoute = require("./routes/auth.route");

const APIRoute = require("./api/routes/route");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", APIRoute);

app.use(express.static("public"));

app.use(
	cookieParser([process.env.SESSION_SECRET_A, process.env.SESSION_SECRET_1])
);

app.get("/", (req, res) => {
	res.render("index");
});

app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/profile", profileRoute);
app.use("/trans", tranRoute);
app.use("/auth", authRoute);

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).render("errors/error500", { err: err });
});

const listener = app.listen(process.env.PORT, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
