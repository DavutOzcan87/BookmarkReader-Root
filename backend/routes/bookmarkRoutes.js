var express = require('express');
var router = express.Router();
const USERS = require('../user/users');
const UserValidator = require('../user/UserValidation').UserValidationHelper;

router.get('/:googleId/bookmarks', function (req, res, next){
    let googleId = req.params.googleId;

    console.log("google id ->" , googleId);
    console.log("google id lenght ->" , googleId.length);
    findByGoogleId(googleId)
    .then(user =>{
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
    findByGoogleId(googleId)
        .then(user=>{
            let index = user.bookmarks.indexOf(oldValue);
            if(index == -1)
                throw new CustomException(400 , `Invalid request` , `User does not contains ${oldValue}`);
            user.bookmarks[index] = newValue;
            return USERS.update({googleId:googleId} , user);
        })
        .then(update=>{
            console.log("updated ->" , update);
            return USERS.findByGoogleId(googleId);
        })
        .then(user=>{
            resp.status(200).send(user);
        })
        .catch(e=>{
            errorResponse(resp ,e);
        })
});

router.delete("/:googleId/bookmarks" , (req , resp , next)=>{
    let bookmarksToDelete = req.body;
    let googleId = req.params.googleId;
    findByGoogleId(googleId)
    .then(user=>{
            user.bookmarks = user.bookmarks.filter(item => !bookmarksToDelete.includes(item));
            return user;
        })
    .then(user =>{
              update(user);
        })
    .then(update =>{
            return USERS.findByGoogleId(googleId);
        })
    .then(user=>{
            resp.status(200).send(user);
        })
    .catch(e=>{
            errorResponse(resp , e);
        });
});

router.post("/:googleId/delete-bookmarks" , (req , resp , next)=>{
    let bookmarksToDelete = req.body;
    let googleId = req.params.googleId;
    findByGoogleId(googleId)
    .then(user=>{
            user.bookmarks = user.bookmarks.filter(item => !bookmarksToDelete.includes(item));
            return user;
        })
    .then(user =>{
              update(user);
        })
    .then(update =>{
            return USERS.findByGoogleId(googleId);
        })
    .then(user=>{
            resp.status(200).send(user);
        })
    .catch(e=>{
            errorResponse(resp , e);
        });
});

router.post("/:googleId/bookmarks" , (req , resp , next)=>{
    let googleId = req.params.googleId;
    let bookmarkArray = req.body;
    findByGoogleId(googleId)
        .then(user=>{
            if(!Array.isArray(bookmarkArray) || !isStringArray(bookmarkArray))
                throw new CustomException(400 , `Not a string array -> ${bookmarkArray}` , "request body must be string array");
            user.bookmarks = user.bookmarks.concat(bookmarkArray.filter(item => !user.bookmarks.includes(item)) );
            return update(user);
        }).then(()=>{
            return findByGoogleId(googleId);
        }).then(user=>{
            resp.status(200).send(user);
        }).catch(e=>{
            errorResponse(resp , e);
        });
});

function findByGoogleId(googleId)
{
    return USERS.findByGoogleId(googleId)
    .then(user=>{
        if(!user)
            throw new CustomException(404 , `User "${googleId}" not found` , "Not found");
        return user;
    });
}

function update(user){
    return USERS.update({googleId:user.googleId} , user);
}

class CustomException{
    constructor(status , message , error){
        this.status = status;
        this.message = message;
        this.error = error;
    }
}

function userNotFound(res, googleId, err) {
    res.status(404).send({ msg: `user not found with google id "${googleId}"`, error: err });
}

function errorResponse(res , err)
{
    if(err instanceof CustomException)
    {
        res.status(err.status).send({message:err.message ,error:err.error });
    }else
        res.status(500).send({message:"request failed" , error : err.message});
}

function isStringArray(arr){
    return arr.find(item => typeof item !== 'string') === undefined;
}

module.exports = router;
