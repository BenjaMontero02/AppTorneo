import express from 'express';
import gimnastaRouter from '../src/routes/gimnastaRoute.js'

import cors from 'cors'

const app = express();
//midleware
app.use(express.json());
app.use(cors());

app.use("/gimnasta", gimnastaRouter);



export default app;