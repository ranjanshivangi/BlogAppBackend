import Blog from "../models/blog.class";


export const collection = () => {
  var collect = require('../config/database').blogCollection;
  return collect
}

export const getAllBlogs = async () => {
  var blogs = []
  const cursor = await collection().find();
  blogs = await cursor.toArray();
  if (blogs === []) {
    throw new Error('No blog posted so far')
  }
  else {
    return blogs;
  }
};

export const postBlog = async (body, imageName) => {
  const { userId, userName, title, description, category } = body
  const image = `${process.env.APP_HOST}:${process.env.APP_PORT}/uploads/${imageName}`;
  const blogData = new Blog(userId, userName, title, description, image, category)
  const data = await collection().insertOne(blogData)
  return data;
}

export const getMyBlogs = async (userID) => {
  var blogs = []
  const cursor = await collection().find({ userId: userID });
  blogs = await cursor.toArray();
  if (blogs === []) {
    throw new Error('No blog posted so far')
  }
  else {
    return blogs;
  }
};

export const editBlogWithImage = async (blogId, body, imageName) => {
  const { title, description, category } = body
  const image = `${process.env.APP_HOST}:${process.env.APP_PORT}/uploads/${imageName}`;
  const data = await collection().findOneAndUpdate({ _id: blogId },
    {
      $set: {
        title: title,
        description: description,
        category: category,
        image: image,
      },
    },
    {
      returnNewDocument: true,
    }
  )
  return data;
}

export const editBlog = async (blogId, body) => {
  const { title, description, category } = body
  const data = await collection().findOneAndUpdate({ _id: blogId },
    {
      $set: {
        title: title,
        description: description,
        category: category,
      },
    },
    {
      returnNewDocument: true,
    }
  )
  return data;
}



