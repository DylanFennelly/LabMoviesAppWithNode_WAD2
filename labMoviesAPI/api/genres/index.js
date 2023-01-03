import express from 'express';
import Genre from './genreModel';
import { getTVGenres } from '../tmdb-api';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 
// Get all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});

router.get('/tv', asyncHandler( async(req, res) => {
    const genres = await getTVGenres();
    res.status(200).json(genres);
  }));

export default router;