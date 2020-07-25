import userRoutes from './routes/user';
import tmdbAPIRoutes from './routes/tmdbAPI';

export default app => {
  app.use(userRoutes);
  app.use(tmdbAPIRoutes);
};
