//Load venues or redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		var locationLatitude = localStorage.latitude;
		var locationLongitude = localStorage.longitude;
		
		mixpanel.register({gang: color, gangster: gangster}); //Track for the droplet click is in index.html
		mixpanel.track("PageLaunch", {page:"index"});
		mixpanel.track("SprayingInitiated", {latitude: locationLatitude, longitude: locationLongitude});
		
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
              owner.append("Untagged").appendTo(venue);
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

          jQuery("h1.location").fitText(1.4, { minFontSize: '20px', maxFontSize: '60px' })
          jQuery(".category").fitText(1, { minFontSize: '10px', maxFontSize: '60px' })
          jQuery("h3.title").fitText(3, { minFontSize: '10px', maxFontSize: '30px' })

        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the venues");
        });
    }
});
