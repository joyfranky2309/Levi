const express = require("express")

const router = express.Router() ;

router.route("/test").get(async (req,res)=>{
    res.send("This is working bro");
    console.log("this is working bro")
})


module.exports = router;