//Load venues or redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;

		mixpanel.register({gang: color, gangster: gangster});
		mixpanel.track("PageLaunch", {page:"index"});

		//Change color background depending on player's color
        $('body').removeClass().addClass(color)

        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );

        //Animate.css
        jQuery('#start-to-spray').addClass('animated pulse');

        //Check GPS
        watchGPS();

        //Get Venues
        var authorization=localStorage.authorization;
        var endpoint = "http://vm0063.virtues.fi/venues/";
        $.ajax({
          type: "GET",
          url: endpoint,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {
          for (var i = data.length - 1; i >= 0; i--) {
            var venue = $("<div>").addClass("venue");
            var owner = $("<p>").addClass("owner");
            var gang = data[i].gang;
            if (gang != null) {
              owner.append("Tagged by ");
              $("<span>").addClass(gang+"-owns").text(gang).appendTo(owner);
              owner.appendTo(venue);
            } else {
              owner.append("Untagged").appendTo(venue); //TODO change with something better
            }

            $("<div>").addClass("category").addClass(getCategoryClass(data[i].category)).appendTo(venue);
            $("<h3>").addClass("title").text(getCategory(data[i].category)).appendTo(venue);
            $("<h1>").addClass("location").text(data[i].name).appendTo(venue);
            $('#main-slider').append(venue);
          };

          // Venue slider
          $('#main-slider').liquidSlider({
              hashLinking:false,
              crossLinks:true,
              includeTitle:true,
              mobileNavigation:false,
              firstPanelToLoad:1,
              autoHeight:false,
              minHeight: 0,
              swipe: true,
              hideArrowsWhenMobile: true,
              dynamicArrows: false,
              slideEaseFunction:'easeInOutCubic',
              slideEaseDuration:400,
              heightEaseDuration:800

            // animateIn:"slideInLeft",
            // animateOut:"slideOutLeft"
          });

          jQuery("h1.location").fitText(1.6);
          jQuery(".category").fitText(.6);
          jQuery("h3.title").fitText(1.5);

        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the venues");
        });
    }
});
