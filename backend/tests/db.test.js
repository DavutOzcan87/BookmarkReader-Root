let expect = require('chai').expect;
let db = require('../db/db');
describe('database tests' , function(){

    afterEach(function() {
        db.close();
      });

    it('should return null as connection when not opened' , ()=>{
        expect(db.get()).to.be.null;
    });

    it('close should set to connection null' , ()=>{
        db.close();
        expect(db.get()).to.be.null;
    });

    it('should close the existing connection' , done=>{
            db.connection = {
                close:function(){
                    done();
                }
            };
            db.close();
    });

    it('connect should set connection to given dabase name' , done=>{
        let callback = function(err){
            expect(err).to.be.null;
            expect(db.get()).not.to.be.null;
            db.close();
            done();
        };
        db.connect('mongodb://localhost/todotest' , callback);
    });

});