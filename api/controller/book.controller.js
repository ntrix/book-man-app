const { Book } = require("../../models/db");

module.exports = {

    getAll: async (req, res) => {
        const books = await Book.find();
        res.json( books );
    },

    getQuantity: async (req, res) => {
        const { quantity } = req.params;
        const books = await Book.find();
        res.json( books.slice(0, quantity) );
    }
}
