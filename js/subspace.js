//Check for bust before redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else if (!localStorage.venueid) {
	  window.location = "index.html";
	  }else{
	  
	  	var color = localStorage.color;
		var gangster = localStorage.gangster;
		mixpanel.track("PageLaunch", {page:"subspace", gang: color, gangster: gangster}); 
		
		var checker = bustCheck();
        registerSpray(checker);
       
  
		//Change color background depending on player's color
        $('body').removeClass().addClass(color)
        /*$("#can-spraying").attr("src", "img/can-"+color+".png" );
		$('.particle').removeClass().addClass("spray"+color);
		*/
}});

      // Showing and hiding text elements
      jQuery(document).ready(function() {
	  
        // jQuery("p#prepare").fadeIn(1000);
        jQuery("p#prepare").delay(1000).fadeOut(3000);
        // jQuery("p#progress").delay(5000).fadeIn(1000);
        setTimeout(function() {
        window.location.href = "index.html";
         }, 4000);
    });

var registerSpray = function(checker) {
          //first check if the gangster is busted
		
		if (checker == 1){
		       var gangster = localStorage.gangster;
               var authorization=localStorage.authorization;
               var endpoint = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
			   localStorage.points  = Number(localStorage.points) - 30;
               localStorage.busted = Number(localStorage.busted) + 1;
               var data =  {
                      points: localStorage.points,
                      busted: localStorage.busted,
					  spraying: 0,
					  bustedviapolice: 0
                  }
				  mixpanel.track("GotBusted", {Time:now, gang: color, gangster: gangster, venue: venue});

			   $.ajax({
               type: "PATCH",
               url: endpoint,
		       async: false, 
               dataType: 'json',
			   data: data,
               beforeSend: function (xhr) {
               xhr.setRequestHeader ("Authorization", authorization);
                 }
               }).done(function( data ) {
	    		$("#modal-busted").addClass("md-show"); //DOES NOT WORK YET
              //animation
               $('.icon-surprised').addClass('animated bounce');
               $('.error .md-content button').addClass('animated fadeIn');
               $('.md-close').one( "click", function() {
               window.location.replace("index.html");
               });
			   
			     }).fail(function( jqXHR, textStatus ) {
                 alert("Second for venue: Something went wrong with bustcheck");
                 });
				 
		}else if (checker = 0){
        var authorization=localStorage.authorization;
        var gangster = localStorage.gangster;
		var color = localStorage.color;
        var venue2 = JSON.parse(localStorage.getItem('venueid')); 
		var venue = parseInt(venue2);
        var now = moment().format();
		var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
        var data =  {
                gangster: gangster,
                latestEditTimestamp: now,
				sprayinginitialized:0,
				gangsterSpraying: 0
            }
		mixpanel.track("SprayingFinalised", {Time:now, gang: color, gangster: gangster, venue: venue});

        $.ajax({
          type: "PATCH",
          url: endpoint,
          dataType: 'json',
		  async: false,
          data: data,
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {
              localStorage.points  = Number(localStorage.points) + 100;
              localStorage.tags_created = Number(localStorage.tags_created ) + 1;
              var endpoint = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
              var now = moment().format();
              var data =  {
                      points: localStorage.points,
                      tags_created: localStorage.tags_created,
                      last_action: now,
					  bustedviapolice: 0,
					  spraying: 0
                  }
             
              $.ajax({
                type: "PATCH",
                url: endpoint,
                dataType: 'json',
				async: false,
                data: data,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", authorization);
                }
               
               }).done(function( data ) {
			   setTimeout(function() {
                jQuery('.points-earned').addClass('animated bounceInDown'); 
               }, 3000);
			     
              /*// Points animation
              jQuery({someValue: 0}).animate({someValue:100}, {
              duration: 1000,
              easing:'swing',
              step: function() {
              $('.points-earned span').text (Math.ceil(this.someValue) + "");
              }
              }); */
             
				}).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("First Error: something went wrong while updating the location: "+ textStatus);
              });
        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while updating the location: "+ textStatus);
        });
		}
		}

		
		//Then clear the roster and continue
		
        var authorization=localStorage.authorization;
		var color = localStorage.color;
        var venue2 = JSON.parse(localStorage.getItem('venueid')); 
		var venue = parseInt(venue2);
        var gangsterowns2 = JSON.parse(localStorage.getItem('gangsterowns')); 
		var gangsterowns = parseInt(gangsterowns2);
		var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
        var data =  {
				sprayinginitialized:0,
				gangsterSpraying: 0,
				gangster: gangsterowns 
            }
              $.ajax({
                type: "PATCH",
                url: endpoint,
                dataType: 'json',
				async: false,
                data: data,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", authorization);
                }
               }).done(function( data ){
			  
              var gangster = localStorage.gangster; 
              var endpoint2 = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
              var data =  {                  
					  spraying: 0,
					  bustedviapolice: 0
                  }
             
              $.ajax({
                type: "PATCH",
                url: endpoint2,
                dataType: 'json',
				async: false,
                data: data,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", authorization);
                }
               }).done(function( data ) {

				}).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("First Error: something went wrong while updating the location: "+ textStatus);
              }); 

              }).fail(function( jqXHR, textStatus ) {
              //TODO fix this
                alert("Second Error: something went wrong while updating the location: "+ textStatus);
              });


function bustCheck(){
      
		var gangster = localStorage.gangster;
        var authorization=localStorage.authorization;
        var endpoint = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
        $.ajax({
          type: "GET",
          url: endpoint,
		  async: false, 
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {   	
		       
			   var checker = localStorage.checker; 
			   if (checker !=3){
			   var bustedornot = parseInt(data.bustedviapolice);
			   }else{
			   var bustedornot = checker;}
			   return bustedornot;
			   
			   }).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("Third Error: Something went wrong with bustcheck");
              });
			  
}