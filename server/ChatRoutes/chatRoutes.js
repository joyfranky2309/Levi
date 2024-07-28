const express = require("express");
const Levi = require("../Brain/Dimaag");
const Chat= require("../Mongo/Models/chatSchema")
const router = express.Router() ;
const authMiddleware= require("../UserRoutes/authMiddleware")

router.route("/prompt").post(async(req,res)=>{
   try {
      const {prompt,user} = req.body;
      console.log(user)
    const response= await Levi(prompt);
    console.log(response)
    res.status(200).json({"Ai_reply":response})
   } catch (error) {
    res.status(500).json({"message":"Internal server error"})
   }
})

module.exports = router;