const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const PORT = process.env.PORT || 5000; // Avoid conflict with frontend port
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to handle different types of requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up multer to handle 'multipart/form-data'
const upload = multer(); // We use `multer` here for parsing multipart/form-data

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Error:', err));


const userRoutes = require('./Routes/userRoutes');
const projectRoutes = require('./Routes/projectRoutes');

app.use('/api/users', upload.none(), userRoutes);
app.use('/api/projects',upload.none(), projectRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`);
});
