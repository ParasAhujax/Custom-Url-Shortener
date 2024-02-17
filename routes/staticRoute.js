const express = require('express');
const router = express.Router();
const { redirectUrl } = require('../controllers/urlController');
const Url = require('../models/url')

router.get('/',async (req,res)=>{
    const allUrls = await Url.find();
    
    return res.render('index',{
        urls: allUrls,
    });
})
router.get('/:shortId',redirectUrl);

module.exports = router;