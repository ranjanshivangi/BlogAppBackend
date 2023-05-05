import bcrypt from "bcrypt";
import User from "../models/user.class";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const collection = () => {
  return require('../config/database').userCollection;
}

export const newUser = async (body) => {
  const { fullName, userName, email, password, bio } = body
  const data = await collection().findOne({ email: email });
  if (data != null) {
    throw new Error('User Already Exist')
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userData = new User(fullName, userName, email, hashPassword, bio)
    return collection().insertOne(userData);
  }
}

export const login = async (body) => {
  const { email, password } = body
  const data = await collection().findOne({ email: email });
  if (data == null) {
    throw new Error('User does not exist with this email')
  }
  else {
    const validPassword = await bcrypt.compare(password, data.password);
    if (validPassword) {
      
      let accessToken = jwt.sign({ email: data.email, id: data._id, userName: data.userName }, process.env.ACCESS_SECRET_KEY);

      return { data, accessToken };
    } else {
      throw new Error("Not a Valid Password");
    }
  }
}

export const updateUser = async (body, userID) => {
  const { userName, bio } = body
  return collection().findOneAndUpdate({ _id: ObjectId(`${userID}`) },
    {
      $set: {
        userName: userName,
        bio: bio,
      },
    },
    {
      upsert: true,
      returnNewDocument: true,
    }
  )
}

