$(document).ready(function(){
    //Animate.css
    $('h1').addClass('animated pulse');
    $('input, .btn').addClass('animated slideInLeft');


    //On .btn.btntxt click
    $('.btn.btntxt').one( "click", function() {
        //TODO: Validate.

        var endpoint = "http://vm0063.virtues.fi/authentication/";
        var username = $('#username').val();
        var password = $('#password').val();
        var authorization = make_base_auth(username, password);

        $.ajax({
            type: "GET",
            url: endpoint,
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", authorization);
            }
        }).done(function( data ) {
                localStorage.authorization=authorization;
                localStorage.color=data['color'];
                localStorage.gangster=data['id'];
                localStorage.gang=data['gang'];
                localStorage.points = data['points'];
                window.location.replace("index.html");
        }).fail(function( jqXHR, textStatus ) {
            //TODO fix this - Error message needed
                //alert( "Request failed: " + textStatus );
                $("#modal-name-error").addClass("md-show");
                //window.location.replace("login.html");

                //animation
                $('.icon-locked').addClass('animated bounce');
                $('.error .md-content button').addClass('animated fadeIn');
        });

    });

    $('.md-close').one( "click", function() {
        window.location.replace("login.html");
    });
});

