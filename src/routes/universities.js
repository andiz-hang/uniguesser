var express = require('express');
var router = express.Router();
var model = require('../db/model')
var https = require('https');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    var campus = await model.getCampus();
    var placeId = await getPlaceId(campus.campus_name);
    var photoRefs = await getPhotoRef(placeId);

    var photos = [];

    photoRefs.forEach(photoRef => {
        photos += await getPhoto(photoRef);
    })

    campusPhotos ? res.render('game', {photos: campusPhotos.result.photos}) : res.status(403).send();
});


async function getPhoto(photoRef) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.API_KEY}`;

    try {
        var result = await makeRequest(url)
        return result;
    } catch {
        return false;
    }
}

async function getPhotoRef(placeId) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.API_KEY}&place_id=${placeId}&fields=photo`;

    try {
        var result = await makeRequest(url)
        return result;
    } catch {
        return false;
    }
}

async function getPlaceId(name) {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.API_KEY}&input=${name}&inputtype=textquery&fields=place_id`;

    var result = await makeRequest(url)
    return result.candidates[0].place_id;;

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
                    var result = JSON.parse(data)
                    resolve(result);
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
