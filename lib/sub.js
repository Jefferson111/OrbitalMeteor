if (Meteor.isClient) {
    Meteor.subscribe('Students');
    Meteor.subscribe('UserImages');
    Meteor.subscribe('Users');
    Meteor.subscribe('PreferenceList');
}