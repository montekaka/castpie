const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
// const axios = require('axios');
const db = require('./models/index');
const router = require('./routes.js');

dotenv.config();
let port = 3000;
if( process.env.NODE_ENV === 'development') {
  port = 4200;
}

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(router);

// always redirect back to solve the react-router issue
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname , '/../client/dist/index.html'), (err) => {
		if (err) {
			res.status(500).send(err);
		}
	})
});

// app.get('*', (req, res) => res.status(200).send({
//   message: `Welcome to the articles.fm.`,
// }));

app.listen(port, () => {
  console.log(`Exapmle app listening on port ${port}!`);
});

module.exports = app;
