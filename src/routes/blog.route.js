import express from 'express';
import * as blogController from '../controllers/blog.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { upload } from '../multer/multer';


const blogRouter = express.Router();

blogRouter.get('', blogController.getAllBlogs);

blogRouter.post('/post', upload.single('image') ,userAuth ,blogController.postBlog);

blogRouter.get('/myblogs',userAuth, blogController.getMyBlogs);



export default blogRouter;