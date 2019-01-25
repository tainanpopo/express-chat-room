const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('test', {
        items: ['SMOrc', 'FailFish', 'GivePLZ', 'TakeNRG', 'MingLee', 'Kappa', 'KappaPride', 'PogChamp', 'BibleThump',
            'BloodTrail', 'HeyGuys', 'LUL', 'ResidentSleeper'],
        gugu2525: ['gugu1Cc', 'gugu1Face', 'gugu11', 'gugu12god', 'gugu18', 'gugu1Angel55', 'gugu1Baka', 'gugu1Annoyed',
            'gugu1Bb', 'gugu1ChuL', 'gugu1ChuR', 'gugu1S2', 'gugu1S', 'gugu1TT', 'gugu1Dance'],
        jinny: ['jinnytOMEGALUL', 'jinnytHype', 'jinnytREE']
    });
});

module.exports = router;