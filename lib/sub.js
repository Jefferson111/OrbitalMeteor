if (Meteor.isClient) {
    Meteor.subscribe('Students');
    Meteor.subscribe('UserImages');
    Meteor.subscribe('ProfileImages');
	Meteor.subscribe('Modules');  //follow Collections
	Meteor.subscribe('Users');
	Meteor.subscribe('Scores');
	Meteor.subscribe('Cap');
	Meteor.subscribe('Actualcap');
	Meteor.subscribe('Sem');
}