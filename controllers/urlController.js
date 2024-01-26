const shortid = require('shortid');
const URL = require("../models/user");

async function generateNewShortUrl(req,res,next){
    try{
        console.log(req.body);
        const {url} = req.body;
        
        if(!url){
            return res.status(400).json({error:"url is required"});
        }

        let urlExists = await URL.findOne({longUrl:url})

        if(urlExists){
            return res.json({message:"short url already exists",shortUrl:urlExists.shortUrl});
        }

        const shortId = shortid(8);
        
        await URL.create({
            shortUrl:shortId,
            longUrl:url,
            visitHistory:[]
        });
        return res.json({shortUrl: shortId})
    }catch(err){console.log(err.message)}
}
async function redirectUrl(req,res,next){
    try{
        const shortId= req.params.shortId;
  
        const url = await URL.findOneAndUpdate({
            shortUrl: shortId},{
                $push:{
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });

        if(!url){
            return res.status(400).json({error:"url doesnt exist"})
        }
        
        res.redirect("https://"+url.longUrl);
    }
    catch(err){console.log(err.message)}
}
async function generateCustomUrl(req,res,next){
    try{
        const {customUrl,url}=req.body;
        
        let urlExists = await URL.findOne({shortUrl: customUrl})
        
        if(urlExists){
            return res.json({message:"this short url already exists",shortUrl:customUrl});
        }

        await URL.create({
            shortUrl:customUrl,
            longUrl:url,
            visitHistory: []
        });   
        return res.json({shortUrl:customUrl});
    }catch(err){console.log(err.message)}    
}
module.exports = {
    generateNewShortUrl,
    redirectUrl,
    generateCustomUrl
}