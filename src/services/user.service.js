import bcrypt from "bcrypt";
import User from "../models/user.class";

export const newUser = async (body) => {
  var checkUser = []
  const { userName, email, password } = body
  const collection = require('../config/database')
  const cursor = await collection.find({ email: email });
  await cursor.forEach(element => {
    checkUser.push(element)
  });
  if (checkUser.length != 0) {
    throw new Error('User Already Exist')
  }
  else {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const userData = new User(userName, email, password)
    const data = await collection.insertOne(userData)
    return data;
  }
}
