var express = require("express");
var app = express();
const axios = require('axios');
var server = require("http").Server(app);

app.listen(3000);



app.get("/",function(req,res){
    //res.render(index);
})

app.get("/getprice",function(req,res){
    //res.json(req.params.currency);
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ref-finance%2Cnear%2Caurora%2Cethereum&vs_currencies=usd")
    .then(function(response){
        res.json( {"Coingecko":response.data});
    })
    .catch(function(error){
        res.json(error);
    })
 
})


