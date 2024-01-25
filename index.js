const express = require('express');
const mongoose = require('mongoose');

const userModel = require('./model');
const app = express();
app.use(express.json());

function mongodbConnect(){
    const url = "mongoose data base url"
    mongoose.connect(url).then((res)=>{
        console.log("database is sucessfull connected");
    }).catch((err)=>{
        console.log("the error is this", err)
    })
}
mongodbConnect()

app.post("/send_data", async(req,res)=>{
    const {username, password} = req.body;

    const userData = new userModel({
        username,
        password
    })

    await userData.save();
    res.json({msg:"data is saved"})
})

app.get("/get_data", async(req,res)=>{
    const userData = await userModel.find({})
    res.json({msg:"Send is saved", data : userData});
})


app.listen(8000, ()=>{
    console.log("The Server is running on post http://localhost:8000");
})
