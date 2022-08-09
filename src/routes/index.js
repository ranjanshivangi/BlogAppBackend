import express from 'express';
const router = express.Router();

import userRoute from './userRouter';
import blogRoute from './blogRouter'

const routes = () => {
  router.get('/', (res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/blogs', blogRoute);

  return router;
};

export default routes;
