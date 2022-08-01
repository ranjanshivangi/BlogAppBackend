import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const auth = async (req, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw new Error('Authorization token is required');

    bearerToken = bearerToken.split(' ')[1];

    jwt.verify(bearerToken, process.env.ACCESS_SECRET_KEY, (err, decodedData) => {
      if (err) {
        throw new Error('User not authenticated');
      } else {
        req.body['data'] = decodedData;
        next();
      }
    });
  }
  catch (error) {
    next(error);
  }
};

export const userAuth = async (req, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw new Error(`${HttpStatus.BAD_REQUEST}: Authorization token is required`);
    bearerToken = bearerToken.split(' ')[1];

    jwt.verify(bearerToken, process.env.ACCESS_SECRET_KEY, (err, decodedData) => {
      if (err) {
        throw new Error( `${HttpStatus.UNAUTHORIZED}: User not authenticated`);        
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