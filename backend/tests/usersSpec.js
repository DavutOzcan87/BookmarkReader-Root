var expect = require('chai').expect;
const db = require('../db/db');
describe('user db tests' , function(){
    let user = { name:'user1'};

    before(function(done){
        db.connect('mongodb://localhost:27017' , 'usersdb' , done);
    });
    after(function(){
        db.close();
    });

    beforeEach(function (done){
        db.get().collection('users').insert(user , done);
    } );

    afterEach(function(done){
        db.get().collection('users').drop(done);
    });

    it('should insert new records to db' , ()=>{
        expect(true).to.be.true;
    });

    it('second tet', ()=>{
        expect(true).to.be.true;
    });
});

