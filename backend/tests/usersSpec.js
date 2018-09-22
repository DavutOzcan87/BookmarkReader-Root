var expect = require('chai').expect;
const db = require('../db/db');
const users = require('../user/users');
const ObjectId = require('mongodb').ObjectID;
describe('user db tests' , function(){
    let aUser = { name:'user1'};
    let userArray = [
        {_id:new ObjectId('123412341230'), name:'user2' , surname:'surname 2' , email:'user2@gmail.com' , googleId:'g2' ,sites:[
            "www.google.com","www.facebook.com"
        ]},
        {_id:new ObjectId('123412341231'), name:'user3' , surname:'surname 3' , email:'user3@gmail.com' , googleId:'g3' },
        {_id:new ObjectId('123412341232'), name:'user4' , surname:'surname 4' , email:'user4@gmail.com' , googleId:'g4' }
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

    it('should find by google id' , ()=>{
        return users.findByGoogleId('g4')
            .then(o=>{
                expect(o.name).eql('user4');
                expect(o.surname).eql('surname 4');
                expect(o.email).eql('user4@gmail.com');
                expect(o._id.toHexString()).eql(new ObjectId('123412341232').toHexString());

            });
    });

    it('should update' , ()=>{
        let updatedUser = {name:'user3 updated' , surname:'surname 3 updated' , email:'user3@gmail.com updated' , googleId:'g3' };
        return users.update({googleId:'g3'} ,updatedUser )
        .then(()=>users.findByGoogleId('g3'))
        .then(o=>{
            expect(o.name).to.be.eql('user3 updated');
            expect(o.surname).to.be.eql('surname 3 updated');
            expect(o.email).to.be.eql('user3@gmail.com updated');
        });
    });


    it('should delete' , ()=>{
         users.deleteByGoogleId('g3')
         .then(()=>users.all())
         .then(o=>{
            expect(o.length).to.be.eql(2);
         });
    });

    it('should return null if cannot find' , ()=>{
        return users.findByGoogleId('g234234')
        .then(o=>{
           expect(o).to.be.null;
        });
    })
});

