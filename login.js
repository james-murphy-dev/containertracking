function submit() {
    var init = Kinvey.initialize({
        appKey  : 'kid_SJEyn--we',
        appSecret: 'cac42e4156ce423a9cd9f083ac6f6dd1'
    }).then(function(user){
        var username = $('#username').val();
        var password = $('#password').val();

        var userLogin = Kinvey.User.login(username, password);
        userLogin.then(function(user) {
            if (user['type']=="shipper"){
                window.open('manifest.html', '_self', false);
            }
            else if (user['type']=="customer"){
                window.open('status.html', '_self', false);
            }
        }, function(error) {
            alert("Error");
        });
    }).catch(function(error){
        console.log(error);
    });
}
