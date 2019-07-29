let toggle = 1;

Template.profile.rendered = () => {
}

Template.profile.helpers({

    imageRecognition: () => {
        mobilenet.load()
            .then(net => {
                console.log('Sucessfully loaded model');

                // Make a prediction through the model on our image.
                const imgEl = document.querySelector('#profile-wrap img');
                if (imgEl !== "") {
                    net.classify(imgEl)
                        .then(result => {
                            console.log(result);
                            document.querySelector('#imageTag').innerHTML = result[0].className;
                        }).catch();
                }
            })
            .catch();
    },

    students: () => {
        return Students.find({}, { sort: { createdAt: -1 } });
    },

    friendList: () => {
        return PreferenceList.findOne({ userId: Meteor.userId() }).list;
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
		const username = Meteor.user().username;
		const userId = Meteor.userId();
		return UserImages.findOne({ username: username }, { userId: userId }).image;
	},

    isStudent: function() {
        return Students.findOne({ userId: Meteor.userId() });
    },

    isTeacher: function() {
        return !Students.findOne({ userId: Meteor.userId() });
    },

    getFriendList: function(userId) {
        return PreferenceList.findOne({ userId: userId }).list;

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
                Bert.alert("Image does not exist", "danger", "growl-top-right");
                return false;
            })
    },

    "click #friend-btn": () => {
        console.log("User Preference button clicked");
        updateFriendList(Meteor.userId());
    },

    "click #openbtn": () => {
        if (toggle) {
            document.getElementById("mySidenav").style.width = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        } else {
            document.getElementById("mySidenav").style.width = "0";
            document.body.style.backgroundColor = "white";
        }
        toggle = 1 - toggle;
    },
});

function updateFriendList(userId) {
    Meteor.call("clearPreference", userId);
    const allCheckbox = document.querySelectorAll('.preference-list');
    const friendCheckbox = Array.from(allCheckbox).filter(ele => (ele.checked === true));
    let newList = [];
    friendCheckbox.forEach(ele => {
        newList.push(ele.parentNode.firstElementChild.innerHTML);
    });
    Meteor.call("addPreference", userId, newList);
}