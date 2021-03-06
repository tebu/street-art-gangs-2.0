jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	  
	    window.alert = function(){return null;}; //Javascript popups disabled, atleast for now
		
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		watchGPS();
		mixpanel.track("PageLaunch", {page:"tweaks", gang: color, gangster: gangster}); //Track for mood is in "Click", No super property for gang/gangster because of cache issues
		
		
        //Change color background depending on player's color
        
        $('body').removeClass().addClass(color)

        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );

        //On .btn.btntxt click
        $('.confirm').one( "click", function() {
            localStorage.clear();
            window.location.replace("splash.html");
        });

        $('#save').on( "click", function() {
            var authorization=localStorage.authorization;
            var gangster = localStorage.gangster;
			var pointsAdded = 0;
            var endpoint = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
            var now = moment().format();
			//var a = moment().dayOfYear(Number); Commenting out the points for setting mood, also from FAQ n points: localStorage.points,
			var setMood = $('#mood').val();
            			
			/*if (localStorage.lastMood != null) {
			   var lastMood = parseInt(localStorage.getItem('lastMood'));
			   b = parseInt(a);
			   var comparison = b - lastMood;} //COMPARING THE DATES 
			
			if (localStorage.lastMood == null || comparison <= 1 ){  
			            localStorage.points = Number(localStorage.points) + 30; pointsAdded + 30;}
			localStorage.lastMood = a; */
						
			var color = localStorage.color;
			var gangster = localStorage.gangster;
            var data =  {
                mood: $('#mood').val(),
                last_action: now
            }
			
			mixpanel.track("SetMood", {Mood: setMood, Time: now, gang: color, gangster: gangster, PointsAdded: pointsAdded});
           $.ajax({
              type: "PATCH",
              url: endpoint,
              dataType: 'json',
              data: data,
              beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", authorization);
              }
          }).done(function( data ) {
				
                mood: $('#mood').val("");

          }).fail(function( jqXHR, textStatus ) {
            //TODO fix this
            alert("Error: something went wrong while updating the location: "+ textStatus);
          } 
			);
		
        } );
		
    }

});
