/*const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./shared/db.json');
const db = low(adapter);

db.defaults({ books: [], users: [], trans: [] }).write();*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  //_id: ObjectId,
  username: String,
  email: String,
  password: String,
  isAdmin: Number,
  wrongLoginCount: Number,
  avatarUrl: String,
});

const BookSchema = new Schema({
  //_id: ObjectId,
  title: String,
  description: String,
  coverUrl: String,
});

const TranSchema = new Schema({
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

const Session = mongoose.model("sessions", sessionSchema);
const books = mongoose.model("books", BookSchema);
const users = mongoose.model("users", UserSchema);
const trans = mongoose.model("trans", TranSchema);
module.exports = (books, users, trans)

//module.exports = db;