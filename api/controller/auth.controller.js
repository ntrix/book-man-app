require("dotenv").config();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const sgMail = require("@sendgrid/mail");

const { User } = require("../../models/db");

module.exports.postLogin = async (req, res, next) => {
	const errors = res.locals.errors || [];
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email: email });

		let count = !user ? 0 : user.wrongLoginCount || 0;

		if (count == 4)
			errors.push(
				"Too many fail attempts! Please try again in 24 hours or reset your password."
			);
		else if (!user) errors.push("User does not exist!");
		else if (password && !bcrypt.compareSync(password, user._doc.password)) {
			user.wrongLoginCount = ++count;
			user.save((err) => (err ? console.log(err) : 0));
			errors.push("Wrong password! " + count + " of 4 attempts.");

			if (count >= 3) {
				sgMail.setApiKey(process.env.SENDGRID_API_KEY);
				const msg = {
					to: email,
					from: "dev@tienguyen.com",
					subject: "Warning too many failed attempts by logging in",
					text:
						"You have reached " +
						count +
						" of 4 attempts to login. Please be careful or your account will be locked for 24 hours.",
					html: "<strong>You can also reset your password</strong>",
				};
				try {
					await sgMail.send(msg);
				} catch (err) {
					console.log(err);
				}
				errors.push(
					"A warning message has been sent to this email address!"
				);
			}
		}

		if (errors.length) {
			res.json({ errors: errors });
			return;
		}

		user.wrongLoginCount = 0;
		user.save((err) => (err ? console.log(err) : 0));

		res.json({ token: { userId: user._id, isAdmin: user.isAdmin || 0 } });
	} catch (e) {
		console.log("user not found: ", e);
		next();
	}
};
