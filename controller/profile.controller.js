const { User } = require("../models/db");
const cloudinary = require("cloudinary");

module.exports = {
	index: async (req, res) => {
		let user = await User.findById(req.signedCookies.userId);
		res.render("profile/index", { user: user });
	},

	postUpdate: async (req, res) => {
		let user = await User.findById(req.body.id);
		user.username = req.body.username;
		user.email = req.body.email;
		user.save((err) => (err ? console.log(err) : res.redirect(req.baseUrl)));
	},

	avatar: async (req, res) => {
		let user = await User.findById(req.signedCookies.userId);
		res.render("profile/avatar", {
			user: user,
		});
	},

	postAvatar: async (req, res) => {
		const users = await User.find();
		const errors = res.locals.errors;
		let id = req.signedCookies.userId;

		if (errors) {
			res.render("profile/avatar", {
				errors: errors,
				values: req.body,
				users: users,
			});
			return;
		}

		/*_________Upload avatar file to CD______________*/
		let path = req.file.path;

		cloudinary.config({
			cloud_name: process.env.CD_NAME,
			api_key: process.env.CD_API_KEY,
			api_secret: process.env.CD_API_SECRET,
		});

		cloudinary.uploader.upload(path, async (result, error) => {
			if (result) {
				let user = await User.findById(id);
				user.avatarUrl = result.url;
				user.save((err) => (err ? console.log(err) : 0));
				console.log(result.url);
			} else console.log(error);
			res.redirect("back");
		});
	},
};
