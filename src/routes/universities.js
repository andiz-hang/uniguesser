var express = require('express');
var router = express.Router();
var model = require('../db/model')
var https = require('https');
var htmlParser = require('node-html-parser');


router.get('/', async function(req, res, next) {
    var campuses = await model.getCampus(3);
    var campusList = [];

    for (let i = 0; i < campuses.length; i++) {
        let photoRef = await getPhotoRef(campuses[i].campus_name);
        let photoUrl = await getPhoto(photoRef);

        campusList.push({
            'campus_name': campuses[i].campus_name,
            'university_name': campuses[i].university_name,
            'photo_url': photoUrl
        });
    }
    res.json(campusList);
});

async function getPhotoRef(name) {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.API_KEY}&input=${name}&inputtype=textquery&fields=photo`;
    try {
        var result = await makeRequest(url);
        var photoRef = JSON.parse(result).candidates[0].photos[0].photo_reference;
        return photoRef;
    } catch (err) {
        console.error(err)
        return false;
    }
}

async function getPhoto(photoRef) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${photoRef}&key=${process.env.API_KEY}`;
    try {
        var result = await makeRequest(url);
        var returnedHtml = htmlParser.parse(result);
        var photoUrl = (returnedHtml.querySelector('a').rawAttributes)['HREF'];
        return photoUrl;
    } catch (err) {
        console.error(err)
        return false;
    }
}

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
