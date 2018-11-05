var express = require('express');
var router = express.Router();
const USERS = require('../user/users');
const UserValidator = require('../user/UserValidation').UserValidationHelper;

router.get('/:googleId/bookmarks', function (req, res, next){
    let googleId = req.params.googleId;

    console.log("google id ->" , googleId);
    console.log("google id lenght ->" , googleId.length);
    USERS.findByGoogleId(googleId).then(user =>{
        console.log("found user" , user);
        res.status(200).send(user.bookmarks);
    }).catch(err=>{
        res.status(404).send({ msg:`user not found with gmail id "${googleId}"` , error:err});
    });
});

module.exports = router;