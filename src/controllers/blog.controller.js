import HttpStatus from 'http-status-codes';
import * as BlogService from '../services/blog.service';

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