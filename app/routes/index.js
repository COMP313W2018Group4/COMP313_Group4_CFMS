var express =require('express');
var router = express.Router();

router.get('/',function(req, res, next){
    res.render('../../Project/app/views/index.ejs')
});

module.exports =router;