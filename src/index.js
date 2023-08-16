const express = require('express')

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const port = process.env.PORT ?? 8000
app.get('/', (req, res) =>{
    res.status(200).json({message: 'Mi pagina'})
})
app.use((req, res) =>{
    res.status(404).send('<h2>Page Not Found</h2>')
})
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
})

