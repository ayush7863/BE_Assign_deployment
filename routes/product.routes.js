const express=require("express")
const { ProductModel } = require("../model/product.model")
const productRouter=express.Router()
const jwt=require("jsonwebtoken")

productRouter.get("/",async(req,res)=>{
     const  token  = req.headers.authorization;
     const decoded=jwt.verify(token,"masai")
     
    try {
        if(decoded.userID){
             const productItem=await ProductModel.find({userID:decoded.userID})
             res.status(200).send(productItem)
        }else{
            res.status(400).send({err:"invalid"})
        }
        
       
    } catch (error) {
        res.status(400).send({"err":error.message})
        
    }
    
})

productRouter.post("/add",async(req,res)=>{

    try {
        const productItem=new ProductModel(req.body)
        await productItem.save()
        res.status(200).send({"msg":"Product has been added"})


        
    } catch (error) {
        res.status(400).send({"err":error.message})
        
    }

})

productRouter.patch("/update/:productID",async(req,res)=>{
    const {productID}=req.params   
    const payload=req.body;
    try {
        await ProductModel.findByIdAndUpdate({_id:productID},payload)
        res.status(200).send({"msg":"Product has been Updated"})

        
    } catch (error) {
        res.status(404).send({error:error.message})
        
    }


})

productRouter.delete("/delete/:productID",async(req,res)=>{
    const {productID}=req.params
    try {
        await ProductModel.findByIdAndDelete({_id:productID})
        res.status(200).send({"msg":"Product has been Deleted"})

        
    } catch (error) {
        res.status(404).send({error:error.message})
        
    }


})

module.exports={
    productRouter
}