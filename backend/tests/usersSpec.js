var expect = require('chai').expect;
const db = require('../db/db');
const users = require('../user/users');
describe('user db tests' , function(){
    let user = { name:'user1'};
    let userArray = [
        {name:'user2'},
        {name:'user3'},
        {name:'user4'}
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

    it('all should return records from db' , (done)=>{
        
     users.all().then(o=>{
            console.log("all records from db --->" , o);
            expect(o.length).to.be.eql(3);
            done();
        }).catch(o=>console.log("All method failed", o));
    });
});

