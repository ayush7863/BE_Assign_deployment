const express=require("express")
const { connection } = require("./db")
const { validator } = require("./middleware/product.middleware")
const { productRouter } = require("./routes/product.routes")
const app=express()
require("dotenv").config()
const {userRouter}=require("./routes/user.routes")
const cors=require("cors")

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use("/users",userRouter)
app.use(validator)
app.use("/products",productRouter)



app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Server is Running on ${process.env.port}`)
        
    } catch (error) {
        console.log("Not Connected")
        
        
    }
    

})