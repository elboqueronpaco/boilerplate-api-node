import express, { json, urlencoded } from 'express'
import { corsMiddleware } from './middlewares/cors.middleware.js'

import { moviesRouter } from './movies/routes/movies.js'


export class App {
    constructor(){
        this.app= express()
        this.port = process.env.PORT ?? 8000

        //metodos
        this.middlewares()
        this.router()

    }
    middlewares() {
        this.app.use(corsMiddleware())
        this.app.disable('x-powered-by')
        this.app.use(json())
        this.app.use(urlencoded({extended: false}))

    }
    router() {
        this.app.use('/api/v1/movies', moviesRouter)
        this.app.use((req, res) =>{
            res.status(404).send('<h2>Page Not Found</h2>')
        })
    }
    async listem() {
        await this.app.listen(this.port)
        console.log(`Server listening on port http://localhost:${this.port}`)
    }
}