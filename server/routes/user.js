const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
var axios = require('axios');
var qs = require('qs');
require('dotenv').config()
const {auth} = require('../middleware/auth')


/// model

const {User} = require('../models/user');
const { resolveContent } = require('nodemailer/lib/shared');


router.post('/register', (req, res) =>{
    
    const user = new User(req.body)
    console.log(user)
    user.save((err, doc)=>{
        console.log(err)
        if(err) return res.json({sucess: false});

        user.generateToken((err, user) =>{
            if(err) return res.status(400).send(err);
            res.cookie('auth',user.token).json({
                auth: true,
                userData:{
                    id: user._id,
                    email: user.email,
                    name: user.name
                }

            })
        })

    })
});

router.post('/login', (req, res) =>{
    User.findOne({'email': req.body.email}, (err, user) =>{
        if(!user) return res.json({
            auth: false,
            message: "AUTH did not work",
            userData: false
        })
            
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({
                auth: false,
                message: "Wrong Password",
                userData: false

            });



            user.generateToken((err, user) =>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    auth: true,
                    userData:{
                        id: user._id,
                        email: user.email,
                        name: user.name
                    }

                })
            })
        })
    })

});

router.get('/auth', auth, (req, res) =>{
    res.json({
        auth: true,
        userData: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,

        }
    })
})


router.get('/logout', auth, (req, res) =>{
    req.user.deleteToken(req.user.token, function(err,user){
        if(err) return res.status(400).send(err);
        res.status(200).send("Goodbye");

    })
})


router.post('/gtoken', (req, res) =>{
    console.log(req.body.code)
    console.log(req.body.user.id)

    var data = qs.stringify({
        'client_id': '572277874630-vps772qpqks45qj3fihmuo2v8ltbifth.apps.googleusercontent.com',
       'client_secret': 'yKbRApzkv1PSPr9ERfmUGP0T',
       'code': `${req.body.code}`,
       'grant_type': 'authorization_code',
       'redirect_uri': 'http://localhost:3000' 
    });
    var config = {
        method: 'post',
        url: 'https://oauth2.googleapis.com/token',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
       
    axios(config).then(function (response) {
         console.log(JSON.stringify(response.data));
         const json = response.data
            axios.post(`https://oauth2.googleapis.com/tokeninfo?id_token=${json.id_token}`).then(response =>{
                console.log(response.data)
                const user = User.findOneAndUpdate({id: req.body.user.id}, {refresh_token: json.refresh_token, google_email: response.data.email},{new: true}, (err, doc)=>{
                    if(err) return res.status(400).send(err)
                    res.status(200).json({
                        success: true,
                        doc
                    })
                })
            })
        })

    .catch(function (error) {
        console.log(error);
    });

})




router.post('/sendemail', (req, res)=>{

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'kylomarketing@gmail.com',
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            refreshToken: '1//06a7ny20Y8UKxCgYIARAAGAYSNwF-L9IrDqmkND9vaEvjbCX75gnyKlHPtXmXoTmy80SnztP2u7BlCFwmL9F7ikqV4egejtylxt8',
        }
    })
    
    var mailOptions = {
        from: 'My Name <Kylomarketing@gmail.com>',
        to: 'kylomarketing@gmail.com',
        subject: 'So COOL',
        text: 'Testing is ok!!'
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log(err);
        } else {
            console.log('Email Sent');
        }
    })

})


module.exports = router;