import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';
import { notFound, errorHandler } from './server/middleware/errorMiddleware.js';
import connectDB from './server/config/db.js';

import userRoutes from './server/routes/authRoutes.js';
import complaintRoutes from './server/routes/complaintRoutes.js';
import departmentRoutes from './server/routes/departmentRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

const __dirname = path.resolve();

app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/complaints', complaintRoutes);

// Use history fallback for single-page application routing
app.use(history());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log('This error page');
    const error: Error & { status?: number } = new Error('Not Found');
    error.status = 404;

    res.status(200).sendFile(path.join(__dirname + '/client/build/index.html'));

    next(error);
  });
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});