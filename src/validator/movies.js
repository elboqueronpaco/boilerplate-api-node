const z = require('zod')

const movieSchea = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().positive().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(0),
    poster: z.string().url({}),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )
})

function validateMovie (object) {
    return movieSchea.safeParse(object)
}

module.exports = {
    validateMovie
}