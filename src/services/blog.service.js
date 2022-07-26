import Blog from "../models/blog.class";

export const collection = () => {
  var collect = require('../config/database').blogCollection;
  return collect
}

export const postBlog = async (body, imageName) => {
  const { userId, userName, title, description, category } = body
  const image = `${process.env.APP_HOST}:${process.env.APP_PORT}/uploads/${imageName}`;
  const blogData = new Blog(userId, userName, title, description, image, category)
  const data = await collection().insertOne(blogData)
  return data;

}