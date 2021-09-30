var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser());
app.use(session({secret: 'Turbo secret!'}));

app.get('/', function(req, res){
        if(req.session.page_views){
                req.session.page_views++;
                res.send("Port: " + process.env.USER_PORT + " You visited this page " + req.session.page_views + " times");
        } else {
                req.session.page_views = 1;
                res.send("Port: " + process.env.USER_PORT + " You visited this page for a first time");
        }
});

app.get('/reject', function(req, res){
        res.status(403).send("Port: " + process.env.USER_PORT + " has rejected you");
});

app.get('/not-public', function(req, res){
       res.send("Port: " + process.env.USER_PORT + " this site must not be accessible from the internet");
});



app.listen(process.env.USER_PORT);
