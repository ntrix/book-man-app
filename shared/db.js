/*const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./shared/db.json');
const db = low(adapter);

db.defaults({ books: [], users: [], trans: [] }).write();*/

const mongoose = require("mongoose");
const { Schema } = mongoose;
//const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  //_id: ObjectId,
  username: String,
  email: String,
  password: String,
  isAdmin: Number,
  wrongLoginCount: Number,
  avatarUrl: String,
});

const bookSchema = new Schema({
  //_id: ObjectId,
  title: String,
  description: String,
  coverUrl: String,
});

const tranSchema = new Schema({
  //_id: ObjectId,
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

//module.exports = db;