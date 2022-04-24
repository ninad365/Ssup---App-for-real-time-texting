var express = require('express');
const router = express();
path = require('path');
var User = require('../models/users');

var index = path.join(__dirname, '../views/index.ejs')
var signup = path.join(__dirname, '../views/signup.ejs')

router.get('/', (req, res) => {
    res.render(index);
});
router.get('/signup', (req, res) => {
    res.render(signup);
});
router.post('/signup',(req, res, next)=>{
        var username = req.body.name;
        var password = req.body.password;
        var email  = req.body.email;

        var newUser = new User({
                email: email,
                username: username,
                password: password
			});
        newUser.save(next);
        return res.redirect('/');
    }
)
module.exports = router;