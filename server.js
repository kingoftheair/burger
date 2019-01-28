//Express Set-Up
let express = require("express");
let app = express();

//Port Set-up
let PORT = process.env.PORT || 8080;

//Data Parse
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("/public"));

//Handlebars Set-Up
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Route
let route = require("./controllers/burgers_controller.js");
app.use(route);

//Listener
app.listen(PORT, function(){
    console.log("http://localhost:" + PORT);
})