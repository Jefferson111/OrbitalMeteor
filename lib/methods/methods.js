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

        clearPreference: (userId) => {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {
                const userList = PreferenceList.findOne({ userId: userId });
                if (userList) {
                    PreferenceList.remove(userList._id);
                }
            }
        },

        addPreference: (userId, newList) => {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {
                PreferenceList.insert({
                    userId: userId,
                    list: newList
                });
            }
        }

	});
}

