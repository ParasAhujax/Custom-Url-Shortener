const express = require('express');
const app = express();
const {connectToMongoDb} = require('./connect');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(console.log("mongoDb connected"))

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static('public'))

const route = require('./routes/route');
const StaticRoute = require('./routes/staticRoute');
app.use('/url',route);
app.use('/',StaticRoute);

app.listen(3000,()=>{
    console.log("running on 3000");
})