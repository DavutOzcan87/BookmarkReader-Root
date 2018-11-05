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
        userNotFound(res, googleId, err);
    });
});

router.patch("/:googleId/bookmarks" , (req , resp , next)=>{
    let received = req.body;
    let oldValue = received.oldValue;
    let newValue = received.newValue;
    let googleId = req.params.googleId;
    console.log(`replacing ${oldValue} -> ${newValue}`);
    USERS.findByGoogleId(googleId)
        .then(user=>{
            if(!user)
                userNotFound(resp , googleId , null);
            else{
                let index = user.bookmarks.indexOf(oldValue);
                if(index == -1)
                    throw `user does not contains: ${oldValue}`;
                user.bookmarks[index] = newValue;
                return USERS.update({googleId:googleId} , user);
            }
        })
        .then(update=>{
            console.log("updated ->" , update);
            return USERS.findByGoogleId(googleId);
        })
        .then(user=>{
            resp.status(200).send(user);
        })
        .catch(e=>{
            internalError(resp ,e);
        })
});

module.exports = router;

function userNotFound(res, googleId, err) {
    res.status(404).send({ msg: `user not found with google id "${googleId}"`, error: err });
}

function internalError(res , err)
{
    res.status(500).send({message:"request failed" , error : err});
}
