const express = require('express'),
  mysql = require('mysql'),
  fs = require('fs'),
  app = express(),
  cors = require('cors')
  config = require('./config/config.json');

app.use(express.json()).use(express.urlencoded({extended: true})).use(cors())
// Init Connection To Database
const db = mysql.createConnection(config);

db.connect((err)=> {
  if(err) {
    console.log(err)
  } else {
    console.log('Connected to database!')
  }
})

// Dynamic Route Import
getAllRoutes = () => {
  const routes = fs.readdirSync("./routes");
  routes.forEach((file) => {
    require(`./routes/${file}`)(app, db);
  });
}

app.listen(6809, () => console.log('Server Running at port 6809'));

(executor => {getAllRoutes()})()