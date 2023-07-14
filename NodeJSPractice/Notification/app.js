const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json());

const publicVapidKey = 'BCBvRRHpnOpVSnwbapm87UbnxDzlSq9BkBUH_YMUPrHY3wVpTZqAaD5kv7E_ypJ8jdRXLlrKOzZO9Zlp6ouMK1w';
const privateVapidKey = 'ODRYRMeLrDXayLj_oRVVah0CfjIsr29v2ENe5VWA8pE';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({title : 'Push Test'});

    // Pass object into sendNotification function
    webpush.sendNotification(subscription, payload).catch(err => console.error(err))

    const port = 3000; 
})
app.listen(3000 , () => console.log("Listening"))
