module.exports = {
	requireAuth: (req, res, next) => {
		if (!req.signedCookies.userId) {
			res.cookie("path", req.baseUrl, { signed: true });
			res.redirect("/auth/login");
			return;
		}
		next();
	},

	isAdmin: (req, res, next) => {
		console.log("admin: ", req.signedCookies.isAdmin);
		if (req.signedCookies.isAdmin == 1) return next();
		res.render("index", { errors: "for admin only" });
		console.error("only for admin");
	},
};
