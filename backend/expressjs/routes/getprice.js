var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //   res.send('respond with a resource');
    //res.json(req.params.currency);
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ref-finance%2Cnear%2Caurora%2Cethereum&vs_currencies=usd")
    .then(function(response){
        res.json( {"Coingecko":response.data});
    })
    .catch(function(error){
        res.json(error);
    })
});

module.exports = router;