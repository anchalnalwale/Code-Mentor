const app = require('./src/app');
require("dotenv").config();

app.listen(3000, ()=>{
    console.log("Server is running on Port 3000");
})

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Import routes
// const aiRoutes = require('./routes/ai.routes'); // Adjust path as needed

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/ai', aiRoutes);

// // Basic route for testing
// app.get('/', (req, res) => {
//   res.json({ message: 'Backend server is running!' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Handle 404
// app.use('*', (req, res) => {
//   res.status(404).json({ error: `Route ${req.originalUrl} not found` });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;