const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');

const app=express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const homeRoutes= require('./routes/home');
app.use('/api/home',homeRoutes);

app.use((err,req,res,next)=>{
    if (err){
        res.status(500).json({error: "Internal server error"});
        console.error('Error: ',err);
    }
})

app.listen(5001,()=>{
    console.log("Server is running at http://localhost:5001");
})

