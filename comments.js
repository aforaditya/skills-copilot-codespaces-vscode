// Create web server
// 1. Create a web server
// 2. Create a route for the home page
// 3. Have the home page return a welcome message
// 4. Create a route for an about page
// 5. Have the about page return a welcome message
// 6. Test your work by visiting both in the browser

// 7. Create 2 more routes
//  - /weather
//  - /about
// 8. Send back some JSON data with each
//  - {title: "Weather App", author: "Andrew Mead"}
//  - {name: "Andrew Mead", age: 26}

const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('Welcome to my home page!')
});

app.get('/about', (req, res) => {
    res.send('Welcome to my about page!')
});

app.get('/weather', (req, res) => {
    console.log();
    res.send({
        location: 'Philadelphia',
        forecast: 'It is snowing'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});