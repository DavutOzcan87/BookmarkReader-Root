var express = require('express');
var router = express.Router();
const USERS = require('../user/users');
const UserValidator = require('../user/UserValidation').UserValidationHelper;
/* GET users listing. */
router.get('/', function(req, res, next) {
  USERS.all().then(
      o=>{
          res.send(o);
      }
  ).catch(e=>{
      res.statusCode(500).send({msg:"cannot read records from database" , error:e});
  });
});

router.get('/:googleId', function (req, res, next) {
    console.log("Received google id", req.params.googleId);
    USERS.findByGoogleId(req.params.googleId).then(
        o => {
            if(!o)
            {
                res.status(404).send({msg:`no record found for ${req.params.googleId}` , error:""});
            }else{
                res.send(o);
            }
        }
    ).catch(e => {
        res.status(500).send({ msg: "cannot read records from database", error: e });
    });
});



router.post('/' , function(req , resp , next){
    let body = req.body;
    let newUser = {
        name:body.name,
        surname:body.surname,
        googleId:body.googleId,
        email:body.email,
        bookmarks:body.bookmarks
    };

    let userValidator = new UserValidator();
    userValidator.check(newUser);
    if(!userValidator.isValid)
    {
        resp.status(400).send({msg:'given user data is invalid' , request:newUser , validationErrors:userValidator.messages});
    }else{
        USERS.findByGoogleId(newUser.googleId)
        .then(o=>{
            if(!o)
                return USERS.add(newUser);
            else
                return USERS.update({googleId:newUser.googleId} , newUser);
        })
        .then(()=>{
            resp.send({msg:'New user added'});
        }).catch(e=>{
            resp.status(500).send({msg:'Failed' , error :e});
        });
    }
});

module.exports = router;