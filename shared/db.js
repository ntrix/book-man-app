const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: Number,
  wrongLoginCount: Number,
  avatarUrl: String,
});

const bookSchema = new Schema({
  title: String,
  description: String,
  coverUrl: String,
});

const tranSchema = new Schema({
  userId: String,
  bookId: String,
  isComplete: Boolean
});

const sessionSchema = new Schema({
  cart: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: "Book" },
      quantity: Number
    }
  ]
});

const Book = mongoose.model("books", bookSchema);
const User = mongoose.model("users", userSchema);
const Tran = mongoose.model("trans", tranSchema);
const Session = mongoose.model("sessions", sessionSchema);

module.exports = { Book, User, Tran, Session }