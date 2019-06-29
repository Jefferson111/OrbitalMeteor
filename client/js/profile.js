Template.profile.rendered = () => {
}

Template.profile.helpers({

    student: () => {
        // Yet to be able to render
        return Students.find({}, { sort: { createdAt: -1 } });
    },

	email: function () {
		if (!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().emails[0].address;
		}
	},

	username: function () {
		if (!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().username;
		}
	},

    hasUserImage: function () {
        return UserImages.findOne({ userId: Meteor.userId() });
    },

    image: function () {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		return UserImages.findOne({ username: username }, { userId: userId }).image;
	}

});

Template.profile.events({
    "submit .edit-profile": function (event) {
        let imageURL = document.querySelector('#url').value;
        $.get(imageURL)
            .done(function () {
                // Do something now you know the image exists.
                UserImages.insert({
                    userId: Meteor.userId(),
                    username: Meteor.user().username,
                    image: imageURL,
                });

                Bert.alert("Profile Update Successful!", "success", "growl-top-right");
            }).fail(function () {
                // Image doesn't exist - do something else.
                return false;
            })
	}
});
