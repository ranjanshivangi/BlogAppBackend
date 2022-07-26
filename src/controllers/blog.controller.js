import HttpStatus from 'http-status-codes';
import * as BlogService from '../services/blog.service';

export const getAllBlogs = async (req, res) => {
    try {
        const data = await BlogService.getAllBlogs(req.body);
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All blogs fetched successfully'
    });
    }catch (error) {      
        res.status(HttpStatus.NO_CONTENT).json({
        code: HttpStatus.NO_CONTENT,
        message: `${error}`
    });
    }
  };

export const postBlog = async (req, res) => {
    try {
        const imageName = req.file.originalname;
        const data = await BlogService.postBlog(req.body, imageName);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Blog created successfully'
        });
    } catch (error) {
        res.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
            message: `${error}`
        });
    }
};