const express = require('express');
const { generateNewShortUrl, redirectUrl, generateCustomUrl} = require('../controllers/urlController');
const router = express.Router();
const URL = require("../models/url")

router.post('/',generateNewShortUrl)

router.post('/custom',generateCustomUrl);

router.get('/:shortId',redirectUrl)



module.exports = router