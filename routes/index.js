const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        items: ['peter', 'nick', 'cake']
    });
});

module.exports = router;