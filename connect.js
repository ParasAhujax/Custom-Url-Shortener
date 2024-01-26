const mongoose = require('mongoose');

async function connectToMongoDb(url){
    try{
        return mongoose.connect(url);
    }
    catch(err){console.log(err.message)}
}
module.exports = {connectToMongoDb}