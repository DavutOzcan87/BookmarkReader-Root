const db = require('../db/db');
const users = require('../user/users');

db.connect('mongodb://localhost:27017' , "usersdb-prod" , err =>{
    if(err)
    {
        console.error("DB connection failed" , err);
    }else{
        users.add({name:'davut' , surname:'ozcan' , googleId:'asdfadfasdfasdf' , email:'test@gmail.com'});
        users.add({name:'feride' , surname:'ozcan' , googleId:'asdfadfasdfasdf' , email:'test@gmail.com'});
    }
});






