import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { MovieService } from '../Services/MovieService.js';

const router = Router();
const movieService = new MovieService();

router.get('/all', Authenticate, async (req, res) => {
  console.log(`This is a get operation`);
  const Movies = await movieService.getMovie(req.query.titulo, req.query.order);
  return res.status(200).json(Movies);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Movie = await movieService.getMovieById(req.params.id);

  return res.status(200).json(Movie);
});

router.post('/create', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const Movie = await movieService.createMovie(req.body);

  return res.status(201).json(Movie);
});

router.put('/update/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Movie = await movieService.updateMovieById(req.params.id, req.body);

  return res.status(200).json(Movie);
});

router.delete('/delete/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Movie = await movieService.deleteMovieById(req.params.id);

  return res.status(200).json(Movie);
});

export default router;
