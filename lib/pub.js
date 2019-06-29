if (Meteor.isServer) {
	Meteor.publish('Users', function() { //follow collections
		if(!this.userId) {
			return false;
			throw new Meteor.Error('not authorised');
		} else {
			return Meteor.users.find();
		}
	});

    Meteor.publish('Students', function () { //follow collections
        if (!this.userId) {
            return false;
            throw new Meteor.Error('not authorised');
        } else {
            return Students.find();
        }
    });

    Meteor.publish('UserImages', function () { //follow collections
        if (!this.userId) {
            return false;
            throw new Meteor.Error('not authorised');
        } else {
            return UserImages.find();
        }
    });
}