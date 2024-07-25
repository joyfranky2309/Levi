const express = require("express");
const Levi = require("../Brain/Dimaag");
const router = express.Router() ;

router.route("/prompt").post(async(req,res)=>{
   try {
    const response= await Levi("laws about drug abuse");
    console.log(response)
    res.status(200).json({"Ai_reply":response})
   } catch (error) {
    res.status(500).json({"message":"Internal server error"})
   }
})

module.exports = router;