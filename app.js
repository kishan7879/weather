
var https = require("https");

const express=require("express");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({encoded: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){
    const query= req.body.cityName;
    
    const url="https://api.weatherapi.com/v1/current.json?key=fb72ab0fe4a7498abff65858221406&q=" + query;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.current.temp_c;
            const icon=weatherData.current.condition.icon;
            const imageURL="//cdn.weatherapi.com/weather/64x64/day/116.png ";
            res.write("<h1>The temperature in " + query +  " is "+ temp +" degrees C.</h1>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })

    })

})




app.listen(3000, function(req,res){
    console.log("Server running on port 3000.");
});
