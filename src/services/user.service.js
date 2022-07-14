import User from '../models/user.model';
import bcrypt from "bcrypt";

export const newUser = async (body) => {
  console.log(body);
  const userPresent = await User.findOne({ email: body.email })
  if (userPresent == null) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    console.log(body)
    const data = await User.create(body);
    console.log(data);
    return data;
  } else {
    throw new Error("User Already Exists");
  }
};