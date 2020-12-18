const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

const token = "17687eb6fa5e965d701ccd333cb1d32d";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";


function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

router.get('/city', function(req, res) {
    timeout(
        3000,
        fetch(baseUrl + "q=" + req.query.q + "&appid=" + token)
    ).catch(function(error) {
        res.status(500).send();
        return Promise.reject(error);
    }).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return 404;
        }
    }).then(function (data) {
        if (data === 404) {
            res.status(404).send();
            return;
        }
        res.json(data);
    })
});

router.get('/coordinates', function(req, res) {
    timeout(
        3000,
        fetch(baseUrl + "lon=" + req.query.lon + "&lat=" + req.query.lat + "&appid=" + token)
    ).catch(function(error) {
        res.status(500).send();
        return Promise.reject(error);
    }).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return 404;
        }
    }).then(function (data) {
        if (data === 404 || data.id === 0) {
            res.status(404).send();
            return;
        }
        res.json(data);
    })
});

module.exports = router;
