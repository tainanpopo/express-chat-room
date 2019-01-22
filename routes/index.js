const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        items: ['SMOrc', 'FailFish', 'GivePLZ', 'TakeNRG', 'MingLee', 'Kappa', 'KappaPride', 'PogChamp', 'BibleThump',
            'BloodTrail', 'HeyGuys', 'LUL', 'ResidentSleeper']
    });
});

module.exports = router;