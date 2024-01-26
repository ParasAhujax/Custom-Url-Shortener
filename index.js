const express = require('express');
const app = express();
const {connectToMongoDb} = require('./connect');
const route = require('./routes/route');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(console.log("mongoDb connected"))

app.use('/',route)

app.listen(3000,()=>{
    console.log("running on 3000");
})