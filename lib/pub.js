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

    Meteor.publish('ProfileImages', function () { //follow collections
        if (!this.userId) {
            return false;
            throw new Meteor.Error('not authorised');
        } else {
            return ProfileImages.find();
        }
    });

	Meteor.publish('Modules', function() { //follow collections
		if(!this.userId) {
			return false;
			throw new Meteor.Error('not authorised');
		} else {
			return Modules.find();
		}
	});
	
	Meteor.publish('Scores', function() { //follow collections
		if(!this.userId) {
			return false;
			throw new Meteor.Error('not authorised');
		} else {
			return Scores.find();
		}
	});

	Meteor.publish('Cap', function() { //follow collections
		if(!this.userId) {
			return false;
			throw new Meteor.Error('not authorised');
		} else {
			return Cap.find();
		}
	});

	Meteor.publish('Sem', function() { //follow collections
		if(!this.userId) {
			return false;
			throw new Meteor.Error('not authorised');
		} else {
			return Sem.find();
		}
	});

	Meteor.publish('Actualcap', function() { //follow collections
		if(!this.userId) {
			return false;
			throw new Meteor.Error('not authorised');
		} else {
			return Actualcap.find();
		}
	});
}