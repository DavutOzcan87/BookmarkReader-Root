var expect = require('chai').expect;
const db = require('../db/db');
const users = require('../user/users');
const ObjectId = require('mongodb').ObjectID;
describe('user db tests' , function(){
    let aUser = { name:'user1'};
    let userArray = [
        {_id:new ObjectId('123412341230'), name:'user2' , surname:'surname 2' , email:'user2@gmail.com' , google_id:'g2' ,sites:[
            "www.google.com","www.facebook.com"
        ]},
        {_id:new ObjectId('123412341231'), name:'user3' , surname:'surname 3' , email:'user3@gmail.com' , google_id:'g2' },
        {_id:new ObjectId('123412341232'), name:'user4' , surname:'surname 4' , email:'user4@gmail.com' , google_id:'g2' }
    ];
    before(function(done){
        db.connect('mongodb://localhost:27017' ,  'users' , done);
    });
    after(function(){
        db.close();
    });

    beforeEach(function (done){
        db.get().collection('users').insertMany(userArray, done);
    } );

    afterEach(function(done){
        db.get().collection('users').drop().then(()=>done());
    });

    it('all should return records from db' , ()=>{
       return users.all().then(o=>{
           expect(o.length).to.be.eql(3);
           console.log("users ->" , o);
       });
    });

    it('should add new record' , ()=>{
        return users.add(aUser).then(o=>{
            expect(o.insertedId).not.to.be.null;
        });
    });
});

