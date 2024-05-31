const express = require("express")

const router = express.Router() ;

router.route("/test").get(async (req,res)=>{
    res.send("Chat wala route");
    console.log("Chat wala route")
})


module.exports = router;