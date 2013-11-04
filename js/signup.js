$(document).ready(function(){
    //Animate.css
    $('h1').addClass('animated pulse');
    $('input, select').addClass('animated bounceInUp');
    $('.btn').addClass('animated bounceInUp');

    //Change background depending on the gang
    $( "#gang" ).change(function () {
        var gang = $( "#gang option:selected" ).attr('id');
        switch (gang) {
            case 'purple':
                $('#signup').removeClass().addClass('purple')
                break;
            case 'greens':
                $('#signup').removeClass().addClass('green')
                break;
            case 'blues':
                $('#signup').removeClass().addClass('blue')
                break;
            default:
                $('#signup').removeClass().addClass('neutral')
        }
    }).change();

    //Form submission
    $('.btn.btntxt').one( "click", function() {
        //TODO: Validate.
        //TODO Check same password

        var endpoint = "http://vm0063.virtues.fi/authentication/";

        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var rePassword = $('#rePassword').val();
        var gang = $( "#gang option:selected" ).data( "gang" );

        var attr = {
            username: username,
            email: email,
            password: password,
            gang: gang
        };

        $.post( endpoint, attr).done(function( data ) {
                var authorization = make_base_auth(username, password);
                localStorage.authorization=authorization;
                localStorage.color=data['color'];
                localStorage.gangster=data['id'];
                localStorage.gang=data['gang'];
                window.location.replace("home.html");
            }).fail(function( jqXHR, textStatus ) {
            //TODO fix this
                //alert("Error");
                window.location.replace("signup.html");
            });

});

});

