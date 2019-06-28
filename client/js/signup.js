Template.signup.rendered = function() {

}

Template.signup.events({
	"submit .form-signup": function(event){
		let username = trimInput(event.target.username.value);
		let email = trimInput(event.target.email.value);
		let password = trimInput(event.target.password.value);
        let password2 = trimInput(event.target.password2.value);
        let accountType = event.target.accountType.value;

		if(isNotEmpty(email) && 
			isNotEmpty(username) && 
			isNotEmpty(password) &&
			isEmail(email) &&
            areValidPasswords(password, password2) &&
            accountType !== "") {

            createAccount(username, email, password);
            if (accountType === 'student') {
                Meteor.call('addStudent');
            }
		}

		return false; //prevent submit
	}

});

function createAccount(username, email, password) {
    Accounts.createUser({
        username: username,
        email: email,
        password: password,
        userId: Meteor.userId(),

    }, function (err) {
        if (err) {
            Bert.alert(err.reason, "danger", "growl-top-right");
        } else {
            Bert.alert("Account created! You are now logged in", "success", "growl-top-right");
            Router.go("/profile");
        }
    });
}

// Validation rules

//Trim Helper
let trimInput = function(val){
	return val.replace(/^\s*|s*$/g,"");
}

let isNotEmpty = function(value){
	if(value && value != ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
}

//Validate Email
isEmail = function(value){
	let filter = /^([a-zA-Z0-9_\.\-])*\@(([a-zA-Z0-9\-])*\.)*([a-zA-Z0-9]{2,4})*$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Please use a valid email address", "danger", "growl-top-right");
	return false;
}

//Check Password Field
isValidPassword = function(password){
	if(password.length < 6) {
		Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
		return false;
	}
	return true;
}

//Match password
areValidPasswords = function(password, confirm) {
	if(!isValidPassword(password)) {
		return false;
	}
	if(password != confirm) {
		Bert.alert("Passwords do not match", "danger", "growl-top-right");
		return false;
	}
	return true;
}