//Load venues or redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		var locationLatitude = localStorage.latitude; //gangster location
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
			
			var venueLatitude = data[i].latitude; //venue location
			var venueLongitude = data[i].longitude;
			
			var distance = locationCheck(locationLatitude,locationLongitude,venueLatitude,venueLongitude); 
			
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
			
			$("<p>").text(""+distance+"").appendTo(venue);
			$("<br>").appendTo(venue);  //TEMP. SOLUTION
			$("<br>").appendTo(venue);
			
			if (distance <=0.015) {
			$("<div>").attr('id','#start-to-spray').append("<a id='drop' class='spray icon-droplet' href='spraying.html'></a>").appendTo(venue); //active droplet					   
			}else if (distance >0.015 && distance<=0.020){
			$("<div>").attr('id','#maybe-to-spray').append("<a class='maybespray icon-droplet'</a>").appendTo(venue); //blinking droplet
			}else{ 
			$("<div>").attr('id','#not-to-spray').append("<a class='notspray icon-droplet'></a>").appendTo(venue);	//inactive droplet 
			}
		
			$("<br>").appendTo(venue);			
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
		
		// START Counting the distances

		function locationCheck(locationLat, locationLon, venueLat, venueLon){    
			
			// Compute spherical coordinates
			
			var rho = 6378.16; // earth ray in meters
			// convert latitude and longitude to spherical coordinates in radians
			// phi = 90 - latitude
			
			var phi_1 = (90.0 - locationLat)*Math.PI/180.0;
			var phi_2 = (90.0 - venueLat)*Math.PI/180.0;
			// theta = longitude
			
			var theta_1 = locationLon*Math.PI/180.0;
			var theta_2 = venueLon*Math.PI/180.0;
	
			// compute spherical distance from spherical coordinates
			// arc length = \arccos(\sin\phi\sin\phi'\cos(\theta-\theta') + \cos\phi\cos\phi')
			// distance = rho times arc length
			var distance = rho*Math.acos( Math.sin(phi_1)*Math.sin(phi_2)*Math.cos(theta_1 - theta_2) + Math.cos(phi_1)*Math.cos(phi_2) ); 
			
			return distance;	
		}
		
		//Counting the distance ENDs
    }
});
