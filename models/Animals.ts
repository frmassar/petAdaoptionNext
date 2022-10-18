import mongoose from "mongoose";

const Animals = new mongoose.Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  race: { type: String, require: true },
  gender: { type: String, require: true },
  description: { type: String, require: true },
  user: { type: String, require: true },
});

// const User = new mongoose.Schema({}
//   )
const Animal = mongoose.models.Animal || mongoose.model("Animal", Animals);
export default Animal;
