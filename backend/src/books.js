const express = require("express");
const app = express();
const body_parser = require("body-parser");
const json_parser = body_parser.json();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_key = `e-com`;
app.use(cors())
const mongoose = require("mongoose");

app.post(`/create_books`, json_parser, async (req, res) => {
    require("../db/books");
    const books = require("./model/books");

    let books_data = new books(req.body)
    let result = await books_data.save()

    res.send(result);
})

app.listen(3500);
//  mongodb://localhost:27017

// mongodb://localhost:27017