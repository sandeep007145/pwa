const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors('*'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// jwt secret token
app.set('secretKey', 'nodeRestApi');

app.use(express.static(path.join(__dirname, 'pwaapp/dist/pwaapp')));

app.get('/', function(req, res) {
    res.json({
        "tutorial": "Build REST API with node.js"
    });
});

// public route

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pwaapp/dist/pwaapp/index.html'));
});



app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});


// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({
            message: "Not found"
        });
    else
        res.status(500).json({
            message: "Something looks wrong :( !!!"
        });

});

var port = process.env.PORT || 8080

app.listen(port, function() {
    console.log('Node server listening on port 8080');
});