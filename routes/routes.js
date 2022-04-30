var express = require('express');
const router = express();
var passport = require('passport');
path = require('path');
var User = require('../models/users');

var index = path.join(__dirname, '../views/index.ejs')
var signup = path.join(__dirname, '../views/signup.ejs')

router.get('/', (req, res) => {
    res.render(index);
});
router.post('/', function (req, res, next) {
	console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
        console.log(data);
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.username = data._id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
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