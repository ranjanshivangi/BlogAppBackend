import HttpStatus from 'http-status-codes';
import * as BlogService from '../services/blog.service';
import { validObjectId } from '../utils/user.util';

export const getAllBlogs = async (req, res) => {
    try {
        const data = await BlogService.getAllBlogs(req.body.userId);
        if (data === null) {
            res.status(HttpStatus.NO_CONTENT).json({
                code: HttpStatus.NO_CONTENT,
                message: 'No blogs posted'
            });
        }
        else {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'All blogs fetched successfully'
            });
        }
    } catch (error) {
        res.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
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

export const getMyBlogs = async (req, res) => {
    try {
        const data = await BlogService.getMyBlogs(req.body.userId);
        if (data === null) {
            res.status(HttpStatus.NO_CONTENT).json({
                code: HttpStatus.NO_CONTENT,
                message: 'No blog posted so far'
            });
        }
        else {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'My blogs fetched successfully'
            });
        }
    } catch (error) {
        res.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
            message: `${error}`
        });
    }
};

export const editBlog = async (req, res) => {
   
    let data = {}
    try {
        const blogId = validObjectId(req.params._id);
        if (req.file != undefined) {
            const imageName = req.file.originalname;
            data = await BlogService.editBlogWithImage(blogId, req.body, imageName);
        }
        else {
            data = await BlogService.editBlog(blogId, req.body);
        }
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Blog edited successfully'
        });
    } catch (error) {
        res.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
            message: `${error}`
        });
    }
};

export const deleteBlog = async (req, res) => {
    
    try {
        const blogId = validObjectId(req.params._id);
        const data = await BlogService.deleteBlog(blogId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
            message: `${error}`
        });
    }
};