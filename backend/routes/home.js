const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/',(req,res)=>{
    db.query('select * from movie',(err,result)=>{
        if (err){
            console.error("Error: ",err);
            return res.status(500).json({error: "Internal server error"});
        }
        return res.status(200).json(result);
    })
})

router.get('/movieName',(req,res)=>{
    const {movieName}=req.query;
    db.query('select * from movie where movieName=?',[movieName],(err,result)=>{
        if (err){
            console.error("Error: ",err);
            return res.status(500).json({error: "Internal server error"});
        }
        else if (result.length>0){
            return res.status(400).json({success: false,message:"Title already exists"});
        }
        else{
            return res.status(200).json({success: true,message:"Title is unique"});
        }
    })
});

router.get('/watched',(req,res)=>{
    db.query('select * from movie where watched="Yes"',(err,result)=>{
        if (err){
            console.error("Error: ",err);
            return res.status(500).json({error: "Internal server error"});
        }
        else if (result.length>=5){
            return res.status(400).json({success: false,message:"Already 5 movies had been watched"});
        }
        else{
            return res.status(200).json({success: true,message:"You can add this movie in watched list"});
        }
    })
});

router.post('/',(req,res)=>{
    const {movieName,releaseYr,genre,watched}= req.body;

    db.query('insert into movie (movieName,releaseYr,genre,watched) values (?,?,?,?)',[movieName,releaseYr,genre,watched],(err,result)=>{
        if (err){
            console.error("Error: ",err);
            return res.status(500).json({error: "Internal server error"});
        }
        return res.status(200).json({success: true,message:"Movie added successfuly"});
    })
});

module.exports = router;
