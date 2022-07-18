import bcrypt from "bcrypt";
import User from "../models/user.class";
import jwt from "jsonwebtoken";

export const collection = () => {
  var collect = require('../config/database');
  return collect
}

export const newUser = async (body) => {
  var checkUser = []
  const { userName, email, password } = body
 
  const cursor = await collection().find({ email: email });
  await cursor.forEach(element => {
    checkUser.push(element)
  });
  if (checkUser.length != 0) {
    throw new Error('User Already Exist')
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userData = new User(userName, email, hashPassword)
    const data = await collection().insertOne(userData)
    return data;
  }
}

export const login = async (body) => {
  var user = {}
  const { userName, email, password } = body 
  const cursor = await collection().find({ email: email });
  await cursor.forEach(element => {
    user = { ...element }
  });
   if (user === {}) {
    throw new Error('User does not exist with this email')
  }
  else {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      let token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
      return { user, token };
    } else {
      throw new Error("Not a Valid Password");
    }
  }
}

