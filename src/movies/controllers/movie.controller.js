import { request, response } from "express";
import { MovieModel } from "../models/movie.model.js";
import { validateMovie } from '../../validator/movies.js'
export class MovieController {
   
    static async getAll(req= request, res= response) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({genre})
        res.status(movies)
    }
    static async getById(req=request, res= response) {
        const {id} = req.params
        const movie = await MovieModel.getById({id})
        if (!movie)
            res.status(404).json({message: 'Movie not found'})
        res.status(200).json(movie)
    }
    static async create(req = request, res= response) {
        const result = validateMovie(req.body)
        if(result.error)
            return res.status(400).json({error: JSON.parse(result.error.message)})
        const newMovie = await MovieModel.create({input: result.data})
        res.status(201).json(newMovie)
    }
}