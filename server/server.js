const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ProductModel = require('./models/Product');
const cors = require('cors');
const bodyPars = require('body-parser');
require('dotenv').config();

app.use(bodyPars.json());

// app.use(express.json());
app.use(cors());

mongoose.connect("<mongodbURL>",{
    useNewUrlParser:true,
}
);

app.post("/insert", async (req,res)=>{
    const productName = req.body.productName;
    const date = req.body.date;
    const product = new ProductModel({productName:productName,dateOfPosting:date})
;
    try{
        await product.save();
        res.send("inserted data");
    }
    catch(err){
        console.log(err);
    }
});

app.get("/read", async (req,res)=>{
        ProductModel.find({},(err,data)=>{
        if(err){
            res.send(err)
        }
        res.send(data)
    })
})

app.put("/update", async (req,res)=>{
    const id = req.body.id;
    const newName = req.body.newName;
    try{
        await ProductModel.findByIdAndUpdate(id,{productName:newName})
        .then(product=>{
            if(!product){
                res.status(404).send({
                    message:"error"
                })
            }
            res.send(product)
        })
        .catch(err=>{
            res.status(500).send({
                message:"error"
            })
        })
       
    }
    catch(err){
        console.log(err)
    }
})

app.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id).exec();
})
const PORT = procces.env.PORT || 3001

app.listen(PORT);
