Students = new Mongo.Collection('Students');
UserImages = new Mongo.Collection('UserImages');
PreferenceList = new Mongo.Collection('PreferenceList');

Students.allow({
    insert: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true; 
        } else return false;
    },
    remove: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true; 
        } else return false;
    }
}); 

UserImages.allow({
    insert: (userId, doc) => {
        if (Meteor.user()) {
            return true; 
        } else return false;
    },
    remove: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true; 
        } else return false;
    }
});

PreferenceList.allow({
    insert: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true;
        } else return false;
    },
    remove: (userId, doc) => {
        if (Meteor.user() && userId === doc.createdBy) {
            return true;
        } else return false;
    }
}); 