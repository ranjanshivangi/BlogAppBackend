import bcrypt from "bcrypt";

export const newUser = async (body) => {
    console.log(body)
    const collection = require('../config/database')
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    console.log(body)
    const data = await collection.insertOne({
        "userName": body.userName,
        "email": body.email,
        "password": body.password
    })
    return data;
}
