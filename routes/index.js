const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Cookie => ", req.cookies);

    if (!req.cookies.playerUid) {
        res.cookie('playerUid', uuidv4());
    }

    res.render('index', { title: 'Express' });
});

module.exports = router;
