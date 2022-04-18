var express = require('express');
const router = express();
path = require('path')

var index = path.join(__dirname, '../views/index.ejs')
var signup = path.join(__dirname, '../views/signup.ejs')

router.get('/', (req, res) => {
    res.render(index);
});
router.get('/signup', (req, res) => {
    res.render(signup);
});

module.exports = router;