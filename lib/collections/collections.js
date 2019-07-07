Students = new Mongo.Collection('Students');
UserImages = new Mongo.Collection('UserImages');
PreferenceList = new Mongo.Collection('PreferenceList');

Students.allow({
    insert: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true; // if logged in by the user that created the account
        } else return false;
    },
    remove: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true; // if logged in by the user that created the account
        } else return false;
    }
}); 

UserImages.allow({
    insert: (userId, doc) => {
        // if (Meteor.user() && userId === doc.createdBy) {
            return true; // if logged in by the user that created the account
        // } else return false;
    },
    remove: (userId, doc) => {
        // if (Meteor.user() && userId === doc.createdBy) {
            return true; // if logged in by the user that created the account
        // } else return false;
    }
});

PreferenceList.allow({
    insert: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true; // if logged in by the user that created the account
        } else return false;
    },
    remove: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true; // if logged in by the user that created the account
        } else return false;
    }
}); 