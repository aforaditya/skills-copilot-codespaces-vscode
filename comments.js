// Create a web server
// 1. Handle GET requests for /comments
// 2. Handle POST requests for /comments
// 3. Handle DELETE requests for /comments/:id

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = 3000;
var comments = [];
var commentNextId = 1;

app.use(bodyParser.json());

app.get('/comments', function(req, res) {
    res.json(comments);
});

app.get('/comments/:id', function(req, res) {
    var commentId = parseInt(req.params.id, 10);
    var matchedComment = _.findWhere(comments, {id: commentId});

    if (matchedComment) {
        res.json(matchedComment);
    } else {
        res.status(404).send();
    }
});

// POST /comments
app.post('/comments', function(req, res) {
    var body = _.pick(req.body, 'name', 'comment');

    if (!_.isString(body.name) || !_.isString(body.comment) || body.name.trim().length === 0 || body.comment.trim().length === 0) {
        return res.status(400).send();
    }

    body.name = body.name.trim();
    body.comment = body.comment.trim();
    body.id = commentNextId++;

    comments.push(body);

    res.json(body);
});

// DELETE /comments/:id
app.delete('/comments/:id', function(req, res) {
    var commentId = parseInt(req.params.id, 10);
    var matchedComment = _.findWhere(comments, {id: commentId});

    if (!matchedComment) {
        res.status(404).json({"error": "no comment found with that id"});
    } else {
        comments = _.without(comments, matchedComment);
        res.json(matchedComment);
    }
});

// PUT /comments/:id
app.put('/comments/:id', function(req, res) {
    var commentId = parseInt(req.params.id, 10);
    var matchedComment = _.findWhere(comments, {id: commentId});
    var body = _.pick(req.body, 'name', 'comment');
    var validAttributes = {};

    if (!matchedComment) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('name') && _.isString(body.name) && body.name.trim().