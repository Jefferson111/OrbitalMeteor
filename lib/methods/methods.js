if (Meteor.isServer) {
    Meteor.methods({
        addStudent: () => {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {
                Students.insert({
                    userId: Meteor.userId(),
                    studentName: Meteor.user().username,
                });
            }
        },
        

	});
}

