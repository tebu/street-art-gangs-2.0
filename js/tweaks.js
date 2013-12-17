jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		var color = localStorage.mood;
		
		mixpanel.track("PageLaunch", {page:"tweaks", gang: color, gangster: gangster});
		mixpanel.track("MoodSet", {});
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
            var data =  {
                mood: $('#mood').val(),
                last_action: now
            }
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
          });

        });
    }

});
