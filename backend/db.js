const mongoose = require("mongoose");

const connectMongo=()=>{
    mongoose.connect("mongodb://localhost:27017/NotebookDB",()=>{
        console.log("Connected to Database successfully");
    });
}
module.exports=connectMongo;