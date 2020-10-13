const { User, Book, Tran } = require("../../models/db");

module.exports = {
	index: async (req, res) => {
		const id = req.body.userId;
		const isAdmin = await (User.findById(id).isAdmin || 0);
		console.log(req.body, isAdmin, id);
		let trans =
			(await (isAdmin || !id ? Tran.find() : Tran.find({ userId: id }))) ||
			[];
		let books = await Book.find();
		let users = await User.find();

		books = books.reduce(
			(acc, b) => Object.assign(acc, { [b._id]: b.title }),
			{}
		);
		users = users.reduce(
			(acc, u) => Object.assign(acc, { [u._id]: u.username }),
			{}
		);

		trans = trans.map((t) => ({
			id: t._id,
			title: books[t.bookId],
			username: users[t.userId],
			isComplete: t.isComplete,
		}));

		res.json({ trans: trans, isAdmin: isAdmin });
	},

	postCreate: async (req, res) => {
		const tran = new Tran({
			userId: req.body.userId,
			bookId: req.body.bookId,
		});

		tran.save(function (err, data) {
			if (err) res.json({ errors: err });
			else res.json(tran);
		});
	},

	complete: async (req, res) => {
		const tran = await Tran.findById(req.params.id);
		if (!tran) return res.json({ errors: "Transaction(id) does not exist" });

		tran.isComplete = true;
		tran.save(function (err, data) {
			if (err) res.json({ errors: err });
			else res.json(tran);
		});
	},
};
