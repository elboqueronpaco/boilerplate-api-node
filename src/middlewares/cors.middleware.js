import cors from 'cors'
const ACCEPTED_ORIGINGS = [
    'http://localhost:3000',
    'http://localhost:5173'
]
export const corsMiddleware = ({acceptedOrigins= ACCEPTED_ORIGINGS} = {}) => cors({
    origin: (origin, callback) => {
        
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }
        if (!origin){
            return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
    }
})