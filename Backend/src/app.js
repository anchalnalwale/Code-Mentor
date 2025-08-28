const express = require('express');
const app = express();
const airoutes = require("../src/routes/ai.routes");
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/ai' , airoutes);
// app.use(cors());


app.get('/' , (req,res)=>{
    res.send('Hello World');
})

module.exports = app ;