import express from 'express';
import config from 'dotenv';
import routes from './server/routes/user.js';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import isAuthenticated from './server/utils/isAuthenticated.js';


config.config();


const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../access.log'),
    { flags: 'a' }
  );  

app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

app.use('/user', isAuthenticated, routes);

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});
const port = process.env.PORT || 8000; 

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.'
 }));

app.listen(port, async() => {
    console.log(`🚀 Server started on portd ${port}`);
});

export default app;