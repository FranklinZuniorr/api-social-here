import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import serverless from 'serverless-http';
import connectDB from '../infrastructure/mongoose';
import { locationRouter } from './location';
import { chatRouter } from './chat';
const router = express.Router();

dotenv.config();

connectDB();

const app: Application = express();
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: 0
}));
app.use(cors({
  origin: '*'
}));
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const port = process.env.PORT || 3000;

router.use('/locations/', locationRouter);
router.use('/chats/', chatRouter);

app.use('/api/', router);
app.listen(port);
module.exports.handler = serverless(app);
