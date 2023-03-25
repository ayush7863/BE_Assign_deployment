const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    image:String,
    title:String,
    status:Boolean,
    userID:String
})


const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}