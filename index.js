// create web server

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/connectDB');

connectDB()
app.use(express.json())
app.use("/api/contacts", require('./routes/contactRoutes'))
app.use("/api/users", require('./routes/userRoutes'))
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port} `)
})