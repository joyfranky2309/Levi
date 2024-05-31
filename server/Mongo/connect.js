const mongoose = require("mongoose");
function connectDB(url){
    console.log(url)
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

.then(()=>console.log("💻 Mongo connected"))
.catch((err)=>{console.log(err)})
}
module.exports=connectDB