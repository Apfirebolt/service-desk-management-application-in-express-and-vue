import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import history from 'connect-history-api-fallback'
import { notFound, errorHandler } from './server/middleware/errorMiddleware.js'
import connectDB from './server/config/db.js'

import userRoutes from './server/routes/authRoutes.js'
import complaintRoutes from './server/routes/complaintRoutes.js'
import departmentRoutes from './server/routes/departmentRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

const __dirname = path.resolve()

app.use('/api/users', userRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/complaints', complaintRoutes)
app.use(history())
  .listen(8081);

let buildLocation = 'client/build'

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.use((req, res, next) => {
    console.log('This error page')
    const error = new Error('Not Found'); //Error object
    error.status = 404;

    //res.render('./404'); by default in express applications you would render a 404 page

    res.status(200).sendFile(path.join(__dirname+'/client/build/index.html'));

    next(error);

  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
