const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require("path")
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))


app.get('/about', (req, res) => {
    res.send('This is data in about Page ')
})



// hbs 

app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, "../temp/views")
app.set("views", viewsDirectory)

//////////////////////////////////////////////////////////////////

var hbs = require('hbs')

const partialsPath = path.join(__dirname, "../temp/partials")

hbs.registerPartials(partialsPath)

///////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.render('index', {
        title: "HOME",
        desc: "this is home page"
    })
})

app.get('/service', (req, res) => {
    res.render('service', {
        title: "SERVICE",
        cname1: "HTML 5",
        cname2: "ApI Testing",
        cname3: "Express JS",
        Location: "Nasr City",
        Price1: 200,
        Price2: 350,
        Price3: 500,
        imag1: "https://dartinnovations.com/wp-content/uploads/2022/03/Html5-development-Seo.jpg",
        imag2: "images/API-Testing-Training-Noida.png",
        imag3: "images/Training-Express-logo.jpg"
    })
})

app.get('/team', (req, res) => {
    res.render('team', {
        title: "TEAM",
        name1: "Nicole mikel",
        name2: "Elon Musk",
        name3: "Jasmine jhon",
        name4: "issac shluter",
        city1: "NewYork",
        city2: "United States",
        city3: "France",
        city4: "Italy",
        age1: 28,
        age2: 42,
        age3: 30,
        age4: 55,
        img1: "images/trainer-2.jpg",
        img2: "images/trainer-3.jpg",
        img3: "images/trainer-2.jpg",
        img4: "images/trainer-1.jpg"
    })
})
app.get('/weather', (req, res) => {
    res.render('weather', {
        title: "weather"
    })
})
app.get('/contactUs', (req, res) => {
    res.render('contactUs', {
        title: "contactUs"
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

////////////////////////////////////////////////////////////////////////////////

// https://api.weatherapi.com/v1/current.json?key=506b68f0a2f847ff9e2102003231603&q=egypt&aqi=no
const request = require('request');

const weatherForecast = (country, callback) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=506b68f0a2f847ff9e2102003231603&q=" +
        country + "&aqi=no";

    request({
        url,
        json: true
    }, (error, response) => {

        if (error) {
            // console.log("Error has Occurred")
            callback("Unable to connect weather service", undefined)
        } else if (response.body.error) {
            // console.log(response.body.error.message)
            callback(response.body.error.message, undefined)
        } else {
            // console.log(response.body.location.name, response.body.current.condition.text,
            //     response.body.current.temp_c);
            callback(undefined, 'Weather in : ' + response.body.location.name + ' is  ' + response.body.current.condition.text +
                " And Temprature is :  " + response.body.current.temp_c)
        }
    })

}

// weatherForecast("egypt");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/team', (req, res) => {
    weatherForecast(req.body.city, (error, data) => {
        if (data) {
            res.render('weather', {
                title: "weather",
                weather: data

            })
        } else {
            res.render('weather', {
                title: "weather",
                e: error
            })
        }

    })

});
