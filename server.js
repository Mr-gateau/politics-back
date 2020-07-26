const express = require('express');
var cors = require('cors')
const app = express();
const port = 8000;
const router = express.Router();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

const aboutRoute = require('./Routes/about');
const dependRoute = require('./Routes/depend');
const postRoute = require('./Routes/post');
const adminRoute = require('./Routes/admin');
const comRoute = require('./Routes/com');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use('/about', aboutRoute);
app.use('/comm', comRoute);
app.use('/depends', dependRoute);
app.use('/post', postRoute);
app.use('/admin', adminRoute);

app.listen(port, (res, req) => {
  console.log("Politiq burn on: " + port);
});