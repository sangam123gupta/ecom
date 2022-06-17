const express = require("express");
const app = express();
const body_parser = require("body-parser");
const json_parser = body_parser.json();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_key = `e-com`;
app.use(cors())
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://Ironman:sangam123@cluster0.7n7uo.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((data) => {
    console.log("database is connected", data);
})
    .catch((error) => {
        console.log("database is not connected", error);
    })

const user = require("./model/user");

// ---------------------------------------   Create  ----------------------------------------//
app.post("/create", json_parser, (req, res) => {

    const data = new user({

        id: mongoose.Types.ObjectId(),
        auther_name: req.body.auther_name,
        age: req.body.age,
        date_of_birth: req.body.date_of_birth,
        book_name: req.body.book_name,
        published_on: req.body.published_on,
        price: req.body.price,

    })

    data.save().then((data) => {

        res.send(data);
        console.log("data is save on database", data);
    })
        .catch((error) => {
            res.send(error);
            console.log("data is not save in database", error);
        })


})
// -----------------------------------------------------------------------------------------------//


// --        register api
app.post(`/resgister`, json_parser, (req, res) => {

    if (req.body.email && req.body.password) {
        user_data = user.findOne(req.body).select("-password");
        if (user) {
            jwt.sign((user_data), jwt_key, (err, token) => {

                if (err) {
                    console.log("somthing went wrong please try again", err);
                    res.send({ result: `somthing went wrong, Please try again` });
                }
                else {
                    res.send(user_data, { auth: token });
                }
            })
        }
        else {
            res.send({
                result: `no user found`,
            })
        }

    }
    else {

        res.send({ result: `user not found` });
    }
})


// ------------
app.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        user_data = user.findOne(req.body).select("-password");
        if (user) {
            jwt.sign((user_data), jwt_key, (err, token) => {

                if (err) {
                    console.log("somthing went wrong please try again", err);
                    res.send({ result: `somthing went wrong, Please try again` });
                }
                else {
                    res.send(user_data, { auth: token });
                }
            })
        }
        else {
            res.send({
                result: `no user found`,
            })
        }

    }
    else {

        res.send({ result: `user not found` });
    }
})


// app.get("/detail/:id",json_parser,(req,res)=>{

// })

// // -------------------------------------------------------------------------------------------------//

// app.delete('single_delete/:id',json_parser,(req,res)=>{

// })

app.listen(4000);
