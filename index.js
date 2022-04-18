const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 4000;                  //Save the port number where your server will be listenings
var routes = require("./routes/routes");

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(routes);