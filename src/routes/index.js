import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import blogRoute from './blog.route'

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/blogs', blogRoute);

  return router;
};

export default routes;
