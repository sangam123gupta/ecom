const express = require("express");
const app = express();
const body_parser = require("body-parser");
const json_parser = body_parser.json();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_key = `e-com`;
app.use(cors())
const mongoose = require("mongoose");

app.post(`/create_author`, json_parser, async (req, res) => {

    require("../db/authors")
    const authors = require("./model/authors");
    let authors_data = new authors(req.body);
    let result = await authors_data.save();

    res.send(result);
})

app.listen(3600);
//  mongodb://localhost:27017

// mongodb://localhost:27017