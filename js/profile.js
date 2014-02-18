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
        
        var endpoint = "http://vm0063.virtues.fi/gangsters/";
        $.ajax({
          type: "GET",
          url: endpoint,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {
			
			
			var gangsterKey =  getKey(data); 
			
            $(".player-name").text(data[gangsterKey].username);
            $( ".mood-title" ).show( "slow" );
            if (data[gangsterKey].mood!=null) {
              $(".mood").text(data[gangsterKey].mood);
            } else {
              $(".mood").text("Set mood from Tweaks");
            }
			
			var rank = sortRanking(data)+1; //Call for sorting the rank*/
			
			
            $("#ranking").text("#"+rank);
            $("#points").text(data[gangsterKey].points);
            $("#tags_created").text(data[gangsterKey].tags_created);
            $("#tags_deleted").text(data[gangsterKey].tags_deleted);
            $("#busted").text(data[gangsterKey].busted);
            $("#busts").text(data[gangsterKey].busts); 


            // Fittext.js
             // $("h3.player-name").fitText(.8);


        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the profile: "+ textStatus);
        });
      }
	  function getKey(data){
	  	for(var i = data.length - 1; i >= 0; i--){
		if(data[i].id == gangster){
		return i;}}
	  }
	  
	  function sortRanking(data){
	    var data2 = data.slice(0);
		data2.sort(function(a,b) { return parseFloat(b.points) - parseFloat(a.points) } );
		for(var j = data2.length - 1; j >= 0; j--){
		if(data2[j].id == gangster){
		return j;}}
	  }
    });


