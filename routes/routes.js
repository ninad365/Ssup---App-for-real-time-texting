var express = require('express');
const chats = require('../models/chats');
const router = express();
var Chat = require('../models/chats');
path = require('path');
var User = require('../models/users');

var index = path.join(__dirname, '../views/index.ejs')
var signup = path.join(__dirname, '../views/signup.ejs')
var chatroom = path.join(__dirname, '../views/chatroom.ejs')

router.get('/', (req, res) => {
	res.render(index);
});
router.post('/', function (req, res, next) {
	User.findOne({ email: req.body.email }, function (err, data) {
		// console.log(data);
		if (data) {
			if (data.password == req.body.password) {
				req.session.userId = data._id;
				req.session.username = data.username;
				Chat.find({}, function (err, chat) {
					if (err){
						console.log(err)
					}
					else{
						res.render(chatroom, {username:data.username, chats:chat});
					}
				});

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/signup', (req, res) => {
	res.render(signup);
});
router.post('/signup', (req, res, next) => {
	var username = req.body.name;
	var password = req.body.password;
	var email = req.body.email;

	var newUser = new User({
		email: email,
		username: username,
		password: password
	});
	newUser.save(next);
	return res.redirect('/');
}
)

router.get('/chatroom', (req, res, next) => {
	console.log("chatroom");

	res.render(chatroom, { username: req.session.username });
}
)

router.post('/chatroom', (req, res, next) => {
	var message = req.body.message;
	console.log(message);
	console.log(req.session.userId);
	var newChat = new Chat({
		message: message,
		sender: req.session.userId,
	});
	newChat.save(next);
	return res.redirect('/chatroom');
}
)

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;