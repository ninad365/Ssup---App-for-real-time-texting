const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 4000;                  //Save the port number where your server will be listenings
var routes = require("./routes/routes");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var MongoStore = require('connect-mongo');
var socket = require('socket.io');

mongoose.connect("mongodb://localhost:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
  })
  .then(()=>{
    console.log("DB connected successfully!!");
  })
  .catch((err)=>{
    console.log(err);
  });

  app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/chat-app"
  })
  }));

  app.use(bodyParser.urlencoded({ extended: false })); // bodyparser before routes
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

var server = app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`); 
});

let io = socket(server)
io.on('connection', (socket) => {
  console.log("User connected: " + socket.id);
  // socket.on("send_message", (data) => {
  //   console.log(data);
  //   socket.emit("receive_message", data.content);
  // });
});
