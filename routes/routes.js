var express = require('express');
const router = express();
path = require('path')

var v = path.join(__dirname, '../index.html')
router.get('/', (req, res) => {
    res.sendFile(v);
});

module.exports = router;