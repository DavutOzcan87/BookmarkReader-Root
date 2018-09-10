let expect = require('chai').expect;
let db = require('../db/db');
describe('database tests' , function(){

    it('should return null as connection when not opened' , ()=>{
        expect(db.get()).to.be.null;
    });

    it('close should set to connection null' , ()=>{
        db.close();
        expect(db.get()).to.be.null;
    });

    it('should close the existing connection' , function(done){
            db.client = {
                close:function(){
                    done();
                },
                db:function(){}
            };
            db.close();
    });

    it('connect should set connection to given dabase name' , done=>{
        let callback = function(err){
            expect(err).to.be.null;
            expect(db.get().databaseName).to.be.eql('mytestdb');
            db.close();
            done();
        };
        db.connect('mongodb://localhost:27017','mytestdb' , callback);
    }); 
    it('should reject invalid schema' , done=>{
        let callback = err =>{
            expect(err).instanceOf(Error);
            done();
        }
        db.connect('badschema://localhost:27017' , 'todotest', callback);
    });
});