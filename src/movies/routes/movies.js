import { Router } from "express";
import { createRequire } from 'module'
import { validateMovie, validatePartialMovie} from '../../validator/movies.js'
const require = createRequire(import.meta.url)
const movies = require('../database/movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
    res.status(200).json(movies)
})
moviesRouter.get('/:id', (req, res) => {
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if (!movie)
        res.status(404).json({message: 'Movie not found'})
    res.status(200).json(movie)
   
})
moviesRouter.get('/', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(genreMovie => genreMovie.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
})
moviesRouter.post('/', (req, res) => {
    
    const result = validateMovie(req.body)
    if(result.error)
        return res.status(400).json({error: JSON.parse(result.error.message)})
    const newMovie = {
        id: randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})
moviesRouter.patch('/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

  if (result.err) {
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})