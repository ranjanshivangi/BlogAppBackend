import { id } from '@hapi/joi/lib/base';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    jwt.verify(bearerToken, process.env.ACCESS_SECRET_KEY, (err, decodedData) => {
      if (err) {
        throw {
          code: HttpStatus.UNAUTHORIZED,
          message: 'User not authenticated'
        };
      } else {
        req.body['data'] = decodedData;
        req.body.userId = decodedData.id;
        req.body.userName = decodedData.userName;
       
        next();
      }
    });
  }
  catch (error) {
    next(error);
  }
};