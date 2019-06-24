Router.configure({
    layoutTemplate: 'layout'
});

//For edit page
Router.route('/edit:_id', function(){
    this.render('edit',  {
        data: function() {
            return Scores.findOne({_id: this.params._id}); 
        }
    });
});

Router.map(function(){
    //Login
    this.route('login', {
        path: '/',
        template: 'login'
    });

    //Signup
    this.route('signup', {
        path: '/signup',
        template: 'signup'
    });

    //home
    this.route('home', {
        path: '/home',
        template: 'home'
    });
});