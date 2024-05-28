
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'

const app = express();

app.use(morgan('dev'));

//para poder leer los datos dej json
app.use(express.json());

app.use("/api", authRoutes);


export default app;