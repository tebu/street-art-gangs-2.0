      //Load venues or redirect
      jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
		var color = localStorage.color;
		var gangster = localStorage.gangster;
		
		mixpanel.track("PageLaunch", {page:"profile", gang: color, gangster: gangster});

        // animate.css
        $('.profile-tiles div').addClass('animated slideInLeft');
        $('.icon-mood2, p.mood').addClass('animated flipInY');

        //Change color background depending on player's color
        $('body').removeClass().addClass(color)

        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );

        //Get Profile
        var authorization=localStorage.authorization;
        var gangster = localStorage.gangster;
        var endpoint = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
        $.ajax({
          type: "GET",
          url: endpoint,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {

            $(".player-name").text(data.username);

 
            $( ".mood-title" ).show( "slow" );
            if (data.mood!=null && data.mood!="") {
              $(".mood").text(data.mood);
            } else {
              $(".mood").text("Go to tweaks to write here");
            }

            $("#ranking").text(data.ranking);
            $("#points").text(data.points);
            $("#tags_created").text(data.tags_created);
            $("#tags_deleted").text(data.tags_deleted);
            $("#busted").text(data.busted);
            $("#busts").text(data.busts);


            // Fittext.js
             // $("h3.player-name").fitText(.8);


        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the profile: "+ textStatus);
        });
      }
    });


