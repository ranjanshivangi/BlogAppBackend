import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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

export const login = async (body) => {
  const userPresent = await User.findOne({ email: body.email });
  if (userPresent == null) {
    throw new Error("User does not exist");
  } else {
    const validPassword = await bcrypt.compare(body.password, userPresent.password);
    if (validPassword) {
      let token = jwt.sign({ id: userPresent._id}, process.env.SECRET_KEY);
      return { user: userPresent, token };
    } else {
      throw new Error("Not a Valid Password");
    }
  }
};
