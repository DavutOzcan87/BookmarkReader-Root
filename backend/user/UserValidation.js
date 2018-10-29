const emailvalidator = require("email-validator");
class UserValidationHelper {
    constructor() {
        this.isValid = false;
        this.messages = [];
    }

    check(user) {
        this.isValid = true;
        this.messages = [];
        this.checkName(user);
        this.checkSurname(user);
        this.checkEmail(user);
        this.checkGoogleId(user);
        this.checkBookmarks(user);
    }
    checkName(user) {
        if (!user.name) {
            this.isValid = false;
            this.messages.push('Username required.');
        }
    }
    checkSurname(user) {
        if (!user.surname) {
            this.isValid = false;
            this.messages.push('Surname required.');
        }
    }
    checkEmail(user) {
        if (!emailvalidator.validate(user.email)) {
            this.isValid = false;
            this.messages.push('Email required.');
        }
    }

    checkGoogleId(user) {
        if (!user.googleId) {
            this.isValid = false;
            this.messages.push("Google Id required.");
        }
    }

    checkBookmarks(user) {
        if (user.bookmarks) {
            let result = user.bookmarks.find(o => typeof o !== 'string');
            if (result) {
                this.isValid = false;
                this.messages.push("User bookmarks should be string list.");
            }
        }
    }
}


module.exports = {
    UserValidationHelper: UserValidationHelper
}; 