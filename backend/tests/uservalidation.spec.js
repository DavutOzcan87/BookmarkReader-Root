const expect = require('chai').expect;
const UserValidation = require('../user/UserValidation').UserValidationHelper;
describe('user validation helper class tests' , ()=>{

    it('Should check name' , ()=>{
        let validator = new UserValidation();
        let user = {};
        validator.check(user);
        expect(validator.isValid).to.be.false;
        expect(validator.messages).to.contains('Username required.')
    });

    it('Should check surname' , ()=>{
        let validator = new UserValidation();
        let user = { name: 'test'};
        validator.check(user);
        expect(validator.isValid).to.be.false;
        expect(validator.messages).to.contains('Surname required.')
    });

    it('Should check email' , ()=>{
        let validator = new UserValidation();
        let user = { name: 'test' , surname:'test' , googleId:'test'};
        validator.check(user);
        expect(validator.isValid).to.be.false;
        expect(validator.messages).to.contains('Email required.');
        expect(validator.messages).to.be.lengthOf(1);
    });

    it('Should not accept string as email check email' , ()=>{
        let validator = new UserValidation();
        let user = { name: 'test' , surname:'test' , email:'invalid email' , googleId:'test'};
        validator.check(user);
        expect(validator.isValid).to.be.false;
        expect(validator.messages).to.contains('Email required.');
        expect(validator.messages).to.be.lengthOf(1);
    });

    it('Should check googleId' , ()=>{
        let validator = new UserValidation();
        let user = { name: 'test' , surname:'test' , email:'email@test.com'};
        validator.check(user);
        console.log('messages ->' , validator.messages);
        expect(validator.isValid).to.be.false;
        expect(validator.messages).to.contains('Google Id required.');
        expect(validator.messages).to.be.lengthOf(1);
    });

    it('should check user sites' ,()=>{
        let validator = new UserValidation();
        let user = { name: 'test' , surname:'test' , email:'test@test.com' , googleId:'test' ,bookmarks:[{},{}]};
        validator.check(user);
        expect(validator.isValid).to.be.false;
        expect(validator.messages).to.contains('User bookmarks should be string list.');
        expect(validator.messages).to.be.lengthOf(1);
    });

    it('should accept valid object' , ()=>{
        let validator = new UserValidation();
        let user = { name: 'test' , surname:'test' , email:'test@test.com' , googleId:'test' ,bookmarks:['www.google.com']};
        validator.check(user);
        console.log('messages ->' , validator.messages);
        expect(validator.isValid).to.be.true;
        expect(validator.messages).to.be.lengthOf(0);
    });

});