      //Load venues or redirect
      jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color) {
        window.location.replace("splash.html");
      } else {

        //Change color background depending on player's color
        var color = localStorage.color;
        $('body').removeClass().addClass(color)

        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );

        //Get Profile
        var authorization=localStorage.authorization;
        var endpoint = "http://vm0063.virtues.fi/gangsters/"; //TODO select correct user
        $.ajax({
          type: "GET",
          url: endpoint,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {

            //TODO: Populate profile


            // Fittext.js

            jQuery("h1.player-name").fitText(.5);
            jQuery("h3.mood").fitText(1.6);
            jQuery("h2").fitText(1.6);

            // animate.css
            jQuery('.profile-header').addClass('animated slideInRight');
            jQuery('ul.profile-list').addClass('animated slideInLeft');

        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the profile");
        });
      }
    });


