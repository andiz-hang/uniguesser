var express = require('express');
var router = express.Router();
var model = require('../db/model')
var https = require('https');
var htmlParser = require('node-html-parser');


router.get('/', async function(req, res, next) {
    try {
        var campuses = await model.getCampus();
        var campusList = [];

        for (let i = 0; i < campuses.length; i++) {
            let searchName = campuses[i].university_name + ' ' + campuses[i].campus_name;
            let photoRef = await getPhotoRef(searchName);
            let photoUrl = await getPhoto(photoRef);
    
            // Some schools do not have photos on Google places
            if (photoUrl) {
                campusList.push({
                    'campus_name': campuses[i].campus_name,
                    'university_name': campuses[i].university_name,
                    'photo_url': photoUrl
                });
            }
            if (campusList.length == 5) {
                break;
            }
        }
        res.json(campusList);
    } catch (err) {
        res.status(422).send("Unable to generate list of schools!");
    }
});

// Reference: https://developers.google.com/maps/documentation/places/web-service/search
async function getPhotoRef(name) {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.API_KEY}&input=${name}&inputtype=textquery&fields=photo`;
    try {
        var result = await makeRequest(url);
        var photoRef = JSON.parse(result).candidates[0].photos[0].photo_reference;
        return photoRef;
    } catch (err) {
        console.error(err)
    }
}

// Reference: https://developers.google.com/maps/documentation/places/web-service/photos
async function getPhoto(photoRef) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${photoRef}&key=${process.env.API_KEY}`;
    try {
        var result = await makeRequest(url);
        var returnedHtml = htmlParser.parse(result);
        var photoUrl = (returnedHtml.querySelector('a').rawAttributes)['HREF'];
        return photoUrl;
    } catch (err) {
        console.error(err)
    }
}

// Reference: https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
async function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
    
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                try {
                    resolve(data);
                } catch {
                    reject();
                }
            });
          }).on("error", (err) => {
            reject()
          });
    });
}

module.exports = router;
