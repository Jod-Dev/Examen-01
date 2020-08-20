const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./database/config');
const cors = require('cors')

//Express Server
const app = express();

//Config  CORS
app.use(cors())

//Read & Parse  Body
app.use(express.json());

//Database
dbConnect();

//Routes
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto:' + process.env.PORT);
});