require("dotenv").config()
const express = require("express");
const api= express();
const port= 5000;
const connector= require("./Mongo/connect.js")
const userRoutes= require("./UserRoutes/userRoutes.js")
const chatRoutes=require("./ChatRoutes/chatRoutes.js")

api.use("/api/user",userRoutes)
api.use("/api/chat",chatRoutes)
api.get( "/", async(req, res) => {
    try {
        console.log('Hi mowa');
        res.send("hi bro")
    } catch (error) {
        console.log(error);
    }
})

const startServer=async()=>{
   try {
    connector(process.env.CONNECTION_STRING);
    api.listen(port, () => console.log(`Server running on port ${port} 🔥`));
   } catch (error) {
    console.log(error);
   }
}
startServer()