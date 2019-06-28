Template.profile.rendered = () => {
}

Template.profile.helpers({
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

	UserImages: function () {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var URL = UserImages.findOne({ username: username }, { userId: userId });
		return URL;
	}

});

Template.profile.events({
	"submit .edit-profile": function (event) {
		var file = $('#profileImage').get(0).files[0];

		if (file) {

			fsFile = new FS.File(file);

			ProfileImages.insert(fsFile, function (err, result) {
				if (err) {
					throw new Meteor.Error(err);
				} else {

					var imageLoc = '/cfs/files/ProfileImages/' + result._id;

					UserImages.insert({
						userId: Meteor.userId(),
						username: Meteor.user().username,
						image: imageLoc,
					});

					Bert.alert("Profile Update Successful!", "success", "growl-top-right");
				}
			});

		}

		return false // prevent submit
	}
});