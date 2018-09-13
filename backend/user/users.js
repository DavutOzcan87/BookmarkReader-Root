const db = require('../db/db');


const DBURL = "mongodb://localhost:27017";
const DBNAME = "usersdb";
const COLLECTION = "users";
module.exports={
    all:function(){
        return new Promise(function(resolve , reject){
            return db.get().collection("users").find({}).toArray(function(err , result){
                if(err)
                    reject(err);
                else 
                    resolve(result);
            });
        });
    },
    add:function(user){
        return db.get().collection(COLLECTION).insertOne(user);
    }
}