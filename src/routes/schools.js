var express = require('express');
var router = express.Router();
var model = require('../db/model')
var https = require('https');
var htmlParser = require('node-html-parser');
const fetch = require('node-fetch');

router.get('/', async function(req, res, next) {
    try {
        var campuses = await model.getCampus();
        var campusList = [];

        for (let i = 0; i < campuses.length; i++) {
            let searchName = campuses[i].university_name + ' ' + campuses[i].campus_name;
            let photoRef = await getPhotoRef(searchName);

            // Some schools do not have photos on Google places
            if (photoRef) {
                    campusList.push({
                        'campus_name': campuses[i].campus_name,
                        'university_name': campuses[i].university_name,
                        'photo_ref': photoRef
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

router.get('/:photoRef', async function(req, res, next) {
    try {
        // Reference: https://stackoverflow.com/questions/52665103/using-express-how-to-send-blob-object-as-response
        var data = await getPhoto(req.params.photoRef);
        var arrayBuff = await data.arrayBuffer()
        var buff = Buffer.from(arrayBuff)
        var result = {
            buff
        };
        res.send(result)
    } catch (err) {
        console.error
        res.status(422).send("Unable to retrieve photo!");
    }
});

// Reference: https://developers.google.com/maps/documentation/places/web-service/search
async function getPhotoRef(name) {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.API_KEY}&input=${name}&inputtype=textquery&fields=photo`;
    try {
        var result = await fetch(url)
        const jsonResult = await result.json()
        if (Object.keys(jsonResult.candidates[0]).length >= 1) {
            var photoRef = jsonResult.candidates[0].photos[0].photo_reference;
            return photoRef;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err)
    }
}

// Reference: https://developers.google.com/maps/documentation/places/web-service/photos
async function getPhoto(photoRef) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${photoRef}&key=${process.env.API_KEY}`;
    try {
        var result = await fetch(url)
        var photoBlob = await result.blob()
        return photoBlob;
    } catch (err) {
        console.error(err)
    }
}

module.exports = router;
