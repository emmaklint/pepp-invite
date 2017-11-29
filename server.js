const express = require('express')
const request = require('request');
const http = require('http');
const validator = require("email-validator");

const port = process.env.PORT || 3000;
const config = require('./config.json')


var bodyParser = require('body-parser');
var expressValidator = require('express-validator/check');
const { check, validationResult } = require('express-validator/check');

// const hbs = require('hbs');

const app = express()
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {

  res.send(200);
})

app.post('/', function(req, res) {
    var mail = req.body.mail;

    if (validator.validate(mail)) {
      request(`https://slack.com/api/users.admin.invite?token=${config.token}&email=${mail}`
        , function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        if (error === null) {
          console.log('API success')
          //Feedback to client: En inbjudan har skickats till mail
        }
      });
    } else {
      res.send(400, { error: "Not a valid mail adress" });


    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`))
