const express = require("express");
const app = express();
const body_parser = require("body-parser");
const json_parser = body_parser.json();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_key = `e-com`;
app.use(cors())
const mongoose = require("mongoose");
require(`../db/config`)
const new_user=require(`./model/newUsers`)
const authors=require("./model/authors");
const books=require("./model/books"); 
app.post(`/create`,json_parser,async(req,res)=>{

    let user_data=new new_user(req.body);
    let books_data=new books(req.body);
    let authors_data=new authors(req.body);
    books_data.save()
    authors_data.save()
    let result=await user_data.save();
    res.send(result);
})

async function verifyToken(req,resp,next)
{
    let token=req.headers['authorization'];
    if(token)
    {
        console.log("token from verify",token);
        token=token.split(' ')[1];
        jwt.verify(token,jwt_key,(err,valid)=>{
            if(err)
            {
                resp.status(401).send({result:"please provide authorization"});
                
            }
            else
            {
                next();
            }
        })

    }
    else
    {
        resp.status(403).send({result:"please add token"})
    }
}

// ---------

app.post('/register',json_parser,async(req,res)=>{

    let existense= new_user.findOne({email:req.body.email});
    existense.then(async(data)=>{
        if(data==null)
        {
            let user_data=new new_user(req.body);
            let result=await user_data.save();
            result=result.toObject();
            delete result.password; 
            jwt.sign({result},jwt_key,{expiresIn:"4h"},(err,token)=>{
                if(err)
                {
                    console.log("somthing wrong",err);
                    res.send({result:'somthing wrong'});
                }
                else
                {
                    console.log("response",token);
                    res.send({result, auth:token})
                }
            })
        }
        else
        {

            console.log("email used",data);
            res.send({result:`this email is already used`});
        }

    })
    .catch(async(err)=>{
        console.log("something wrong");

    })


    
})
// ---
app.post('/dummyregister',json_parser,async(req,res)=>{
    let existense= new_user.findOne({email:req.body.email});
    existense.then((data)=>{
        console.log("data is present",data);
        res.send(data);
    })
    .catch((err)=>{
        console.log("data is not present",err);
        res.send({result:"data not"});
    })
    // let user_data=new new_user(req.body);
    // let result=await user_data.save();
    // result=result.toObject();
    // delete result.password; 
    // jwt.sign({result},jwt_key,{expiresIn:"4h"},(err,token)=>{
    //     if(err)
    //     {
    //         console.log("somthing wrong",err);
    //         res.send({result:'somthing wrong'});
    //     }
    //     else
    //     {
    //         console.log("response",token);
    //         res.send({result, auth:token})
    //     }
    // })
    
})
// ---
app.post(`/login`,json_parser,async(req,res)=>{
    if (req.body.email && req.body.password) {
        let user_data =await new_user.findOne(req.body).select("-password");
        if (user_data) {
            jwt.sign({user_data}, jwt_key,{expiresIn:"4h"}, (err, token) => {

                if (err) {
                    console.log("somthing went wrong please try again", err);
                    res.status(401).send({ result: `somthing went wrong, Please try again` });
                }
                else {
                    res.status(200).send({user_data,  auth: token });
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

// ------  Delete Api

app.delete("/product/:id",json_parser,verifyToken,async(req,res)=>{

   const result= await authors.deleteOne({_id:req.params.id});
   res.send(result);

})
 
// ------   Create 
app.post("/product",json_parser,verifyToken,async(req,res)=>{

    if( await req.body.age &&await req.body.dob
        &&await req.body.book &&await req.body.published &&await req.body.price
        )
        {
            let product=await new authors(req.body);
            let result= await product.save();
            res.send(result);

        }
        else
        {
            res.send({result:`all field is not fill`})
        }
})

// ---  get 

app.get("/getproduct",verifyToken,async(req,res)=>{

    let result=await  authors.find()
    
    if(result.length>0)
    {
        res.status(200).send(result);

    }
    else
    {
        res.send({result:"no product found"});
    }
})


// app.post(`/create_books`,json_parser,async(req,res)=>{
//     require("../db/books");
// const books = require("./model/books");

//     let books_data=new books(req.body)
//     let result=await    books_data.save()

//     res.send(result);
// })

// app.post(`/create_author`,json_parser,async(req,res)=>{

//     require("../db/authors")
// const authors=require("./model/authors");
//     let authors_data=new authors(req.body);
//     let result=await     authors_data.save();

//     res.send(result);
// })
app.listen(4500);
//  mongodb://localhost:27017

// mongodb://localhost:27017