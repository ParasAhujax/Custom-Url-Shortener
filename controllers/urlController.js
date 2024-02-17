const shortid = require('shortid');
const URL = require("../models/url");

async function generateNewShortUrl(req,res){
    try{
        const {url} = req.body;
        
        if(!url){
            return res.status(400).render("index",{
                error:"url is required"
            });
        }

        let urlExists = await URL.findOne({longUrl:url})

        if(urlExists){
            return res.render('index',{
                urlExists: "this url already exists",
                shortUrl: urlExists.shortUrl,
            });
        }
        const shortId = shortid(8);
        
        await URL.create({
            shortUrl:shortId,
            longUrl:url,
            visitHistory:[]
        });

        return res.render("index",{
            shortUrl:shortId,
        })
        
    }catch(err){
        console.log(err.message);
        return res.render("index",{
            error: err.message
        });
    }
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
            return res.status(400).render("index",{error:"url doesnt exist"})
        }
        
        res.redirect(url.longUrl);
    }
    catch(err){
        console.log(err.message);
        return res.render('index',{
            error: err.message
        });
    }
}
async function generateCustomUrl(req,res){
    try{
        const {customUrl,url}=req.body;
        
        let urlExists = await URL.findOne({shortUrl: customUrl})
        
        if(urlExists){
            return res.render('index',{
                urlExists: "this custom url already exists",
                id: customUrl,
            });
        }
        await URL.create({
            shortUrl:customUrl,
            longUrl:url,
            visitHistory: []
        });   

        return res.render('index',{
            shortUrl:customUrl
        })     

    }catch(err){
        console.log(err.message)
        return res.render('index',{
            error: err.message
        });
    }    
}

module.exports = {
    generateNewShortUrl,
    redirectUrl,
    generateCustomUrl
}