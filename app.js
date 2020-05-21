const express = require("express");

const app = express();

const https= require("https");

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));

var result = "";

function makingRequestToOpenWeather(){
    https.get(url, (response) => {

        console.log("status code: ", response.statusCode);
        console.log("headers: ", response.headers);

        response.on("data", (d)=> {
            process.stdout.write(d);
            const weatherData = JSON.parse(d)
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const description = weatherData.weather[0].description;

            result = "\nThe temperature for the city " + city + " is "+ temp +", with "+ description;
            console.log(result);

            // const madeupObj = {
            //     name : "Nick",
            //     sex: "Male"
            // }
            // const someJson = JSON.stringify(madeupObj);
            // console.log(someJson);
        });
    }).on("error", (e) =>{
        console.log(e);
    });
}


app.get("/", (req,res) =>{

    //makingRequestToOpenWeather();

    res.sendFile(__dirname + "/index.html");


});


app.post("/", (req, res) => {

    const cityName = req.body.cityName;


    const appID = "4f7e7c575f5876d4fe794786473467e6";
    const unit = "metric";

    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + appID +"&units=" + unit;


    https.get(url, (response) => {

        console.log("status code: ", response.statusCode);
        console.log("headers: ", response.headers);

        response.on("data", (d)=> {
            process.stdout.write(d);
            const weatherData = JSON.parse(d)
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const imageStr = `<img src = "${iconURL}">`;
            res.write("<p> The city: " + city + "</p>");
            res.write("<h1>The temperature is " + temp +", with "+ description + "</h1>");
            res.write(imageStr);
            res.send();

            // const madeupObj = {
            //     name : "Nick",
            //     sex: "Male"
            // }
            // const someJson = JSON.stringify(madeupObj);
            // console.log(someJson);
        });
    }).on("error", (e) =>{
        console.log(e);
    });
});





app.listen(3000, ()=>{
    console.log("weather app listening on port 3000");
});