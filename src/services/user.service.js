import bcrypt from "bcrypt";
import User from "../models/user.class";
import jwt from "jsonwebtoken";

export const collection = () => {
 return require('../config/database').userCollection; 
}

export const newUser = async (body) => {
  let checkUser = []
  const { fullName, userName, email, password, bio } = body

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
    const userData = new User(fullName, userName, email, hashPassword, bio)
    return collection().insertOne(userData)
     }
}

export const login = async (body) => {
  let user = {}
  const { email, password } = body
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

      let accessToken = jwt.sign({ email: user.email, id: user._id, userName: user.userName }, process.env.ACCESS_SECRET_KEY);
      return { user, accessToken };
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
  ).toArray()  
}

