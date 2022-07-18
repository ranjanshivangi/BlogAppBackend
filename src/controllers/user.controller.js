import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const newUser = async (req, res) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await UserService.login(req.body)
    res.set('Authorization', 'Bearer ' + token)
    res.status(HttpStatus.OK).json({
      data: user,
      message: "Login Successfull"
    })
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
}