/*const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./shared/db.json');
const db = low(adapter);

db.defaults({ books: [], users: [], trans: [] }).write();*/

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  username: String,
  email: String,
  password: String,
  isAdmin: Number,
  wrongLoginCount: Number,
  avatarUrl: String,
});

const BookSchema = new Schema({
  _id: ObjectId,
  title: String,
  description: String
});

const TranSchema = new Schema({
  _id: ObjectId,
  userId: String,
  bookId: String,
  isComplete: Boolean
});

module.exports = db;