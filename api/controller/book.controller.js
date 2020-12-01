const { Book } = require("../../models/db");

module.exports = {

    getAll: async (req, res) => {
        const books = await Book.find();
        res.json( books );
    }
}
