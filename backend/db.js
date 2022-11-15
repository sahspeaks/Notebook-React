const mongoose = require("mongoose");

const connectMongo=()=>{
    mongoose.connect("mongodb+srv://Abhi_speaks:Abhisheksvce@mynotes.9mckypa.mongodb.net/",()=>{
        console.log("Connected to Database successfully");
    });
}
module.exports=connectMongo;
// mongodb://localhost:27017/NotebookDB