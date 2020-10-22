function requireAll (req) { req.keys().forEach(req); }


require("./main.css")
require("./index.html")

const digits=["one", "two"];
digits.forEach(digit => require('../source_assets/' + digit + ".glb"))

const aframe = require("aframe");
requireAll(require.context('./components/', true, /\.js$/));
