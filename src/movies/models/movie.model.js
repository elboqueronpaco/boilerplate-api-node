import { randomUUID } from 'crypto'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const movies = require('../database/movies.json')

export class MovieModel {
    static async getAll ({genre }) {
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(genreMovie => genreMovie.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }
    static async getById ({id}) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }
    static async create (input) {
        const newMovie ={
            id: randomUUID(),
            ...input
        }
        movies.push(newMovie)
        return newMovie
    }
}