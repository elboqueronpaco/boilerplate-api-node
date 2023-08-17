import express, { json, urlencoded } from 'express'
//import movies from './database/movies.json'
import { randomUUID } from 'crypto'
import cors from 'cors'
import { validateMovie, validatePartialMovie } from './validator/movies.js'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('./database/movies.json')

const app = express()
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINGS = [
            'http://localhost:3000',
            'http://localhost:5173'
        ]
        if (ACCEPTED_ORIGINGS.includes(origin)) {
            return callback(null, true)
        }
        if (!origin){
            return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
    }
}))
app.disable('x-powered-by')
app.use(json())
app.use(urlencoded({extended: false}))
const port = process.env.PORT ?? 8000
app.get('/', (req, res) =>{
    res.status(200).json({message: 'Mi pagina'})
})
app.get('/api/v1/movies', (req, res) => {
    res.status(200).json(movies)
})
app.get('/api/v1/movies/:id', (req, res) => {
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if (!movie)
        res.status(404).json({message: 'Movie not found'})
    res.status(200).json(movie)
   
})
app.get('/api/v1/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(genreMovie => genreMovie.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
})
app.post('/api/v1/movies', (req, res) => {
    
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
app.patch('/api/v1/movies/:id', (req, res) => {
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
app.use((req, res) =>{
    res.status(404).send('<h2>Page Not Found</h2>')
})
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
})

