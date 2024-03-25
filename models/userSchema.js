const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Car = require("./carModel");
const userSchema = new mongoose.Schema(
  {
    //nom:String,
    nom: { type: String, required: false },
    prenom: String,
    age: Number,
    address: String,
    etat: Boolean,
    image_user: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // tokenreset: stirng,
    // useEd:Boolean,
    role: {
      type: String,
      enum: ["admin", "client", "formateur"],
    },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
    // address: {
    //     street: String,
    //     pays: String,
    //   },
  },
  { timestamps: true }
);

userSchema.post("save", function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const User = this;
    User.password = await bcrypt.hash(User.password, salt);
    User.etat = false;
    User.createdAt = Date.now();
    User.updatedAt = Date.now();
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      // if (user.etat === true && user.archive === false) {
      return user;
      /* }else{throw new Error('compte desactive ou archive')} */
    }
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
