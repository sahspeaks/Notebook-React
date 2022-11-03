const express = require("express");
const app = express();
const connectMongo=require('./db');


connectMongo();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



let port=process.env.PORT;
if(port==null || port==""){
  port=5000;
}
app.listen(port, () => {
  console.log("Server started at port 5000");
});