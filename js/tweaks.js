jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		
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

        $('#save').one( "click", function() {
            var authorization=localStorage.authorization;
            var gangster = localStorage.gangster;
            var endpoint = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
            var now = moment().format();
			var color = localStorage.color;
			var gangster = localStorage.gangster;
            var data =  {
                mood: $('#mood').val(),
                last_action: now
            }
			
			mixpanel.track("SetMood", {Mood: data, Time: now, gang: color, gangster: gangster});
			
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

				location.reload();            
				
          }).fail(function( jqXHR, textStatus ) {
            //TODO fix this
            alert("Error: something went wrong while updating the location: "+ textStatus);
          } 
			);
		
        } );
		

    }

});
