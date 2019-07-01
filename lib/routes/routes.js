Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function(){
    //Login
    this.route('login', {
        path: '/',
        template: 'login'
    });

    this.route('signup', {
        path: '/signup',
        template: 'signup'
    });

    this.route('randomised', {
        path: '/randomised',
        template: 'randomised'
    });

    this.route('optimised', {
        path: '/optimised',
        template: 'optimised'
    });

    this.route('profile', {
        path: '/profile',
        template: 'profile'
    });
});