import bcrypt from "bcrypt";

export const newUser = async (body) => {
  var checkUser = []
  const collection = require('../config/database')
  const cursor = await collection.find({ email: body.email });
  await cursor.forEach(element => {
    checkUser.push(element)
  });
  if (checkUser.length != 0) {
    throw new Error('User Already Exist')
  }
  else {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const data = await collection.insertOne({
      "userName": body.userName,
      "email": body.email,
      "password": body.password
    })
    return data;
  }
}
