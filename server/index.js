const express = require("express");
const api= express();
const port= 5000;


api.get( "/", async(req, res) => {
    try {
        console.log('Hi mowa');
        res.send("hi bro")
    } catch (error) {
        console.log(error);
    }
})


api.listen(port, () => console.log(`Server running on port ${port} 🔥`));