//Load venues or redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else if (!localStorage.venueid) {
	  window.location = "index.html";
	  }else{
	    
		$('.cancel').on("click", function() { //sets checker to three oppose to 1 = busted or 0 = successful spray... this is for subspace
			    localStorage.setItem('checker',3); 
				});	
				
	    getGangster(); 
	  	var color = localStorage.color;
		var gangster = localStorage.gangster;
		mixpanel.track("PageLaunch", {page:"spraying", gang: color, gangster: gangster}); 
		sprayingInitialized();
		
        //Change color background depending on player's color
        $('body').removeClass().addClass(color)
        $("#can-spraying").attr("src", "img/can-"+color+".png" );
		$('.particle').removeClass().addClass("spray"+color);
		window.onbeforeunload=function(){ 
		   window.location.href = "subspace.html";};  
           }
});

      // Percentage loading
      $('.bar-percentage[data-percentage]').each(function () {
        var progress = $(this);
        var percentage = Math.ceil($(this).attr('data-percentage'));
        $({countNum: 0}).delay(10000).animate({countNum: percentage}, {
          duration: 8000,
          easing:'linear',
          step: function() {
            // What todo on every count
            var pct = Math.floor(this.countNum) + '%';
            progress.text(pct) && progress.siblings().children().css('width',pct);
          }
        });
      });

      //TODO: cascade of views

      // Showing and hiding text elements
      jQuery(document).ready(function() {
	  
        // jQuery("p#prepare").fadeIn(1000);
        jQuery("p#prepare").delay(2000).fadeOut(1000);
        // jQuery("p#progress").delay(5000).fadeIn(1000);
        jQuery("p#progress").delay(7000).fadeOut(1000);

        setTimeout(function() {
        window.location.href = "subspace.html";
         }, 26000);

         jQuery("#loading").delay(25000).fadeOut(300);
        
    });

    // Animate.css
    jQuery(document).ready(function(){
            jQuery('p#prepare, p#progress').addClass('animated bounceInDown');
            jQuery('.load-wrap').addClass('animated wobble');
            jQuery('#can-spraying').addClass('animated pulse');
            jQuery('.showup').addClass('animated bounceInDown');
            jQuery('.disappear').addClass('animated bounceOutDown');
            jQuery('.overlay').addClass('animated fadeIn');
            
            jQuery('a#cancel').addClass('animated bounceInUp');
            // Delaying this button 16 seconds to animating out
            $('a#cancel').delay(16000).queue(function(){$('a#cancel').addClass('bounceOutDown')});
			
    });
  



		
function sprayingInitialized() { //SprayingInitialized to 1 in venue database

        var authorization=localStorage.authorization;
        var venue2 = JSON.parse(localStorage.getItem('venueid')); 
		var venue = parseInt(venue2);
		var now = moment().format();
        var gangster = localStorage.gangster;
		var color = localStorage.color;
		var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
		var endpoint2 = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
        var data =  {
				sprayinginitialized:1,
				gangsterSpraying: gangster
            }
		mixpanel.track("SprayingInitialised", {Time:now, gang: color, gangster: gangster, venue: venue});
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
              
              var endpoint = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
              var now = moment().format();
              var data =  {                  
					  spraying: 1
                  }

              $.ajax({
                type: "PATCH",
                url: endpoint,
                dataType: 'json',
                data: data,
				async: false,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", authorization);
                }

               }).done(function( data ) {
				
				}).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("sprayingInitialized: something went wrong while updating the location: "+ textStatus);
              });
			   

              }).fail(function( jqXHR, textStatus ) {
              //TODO fix this
                alert("sprayingInitialized, second error: something went wrong while updating the location: "+ textStatus);
              });
          }
		
function sprayingInterrupted() { 
        
		//first check if the gangster is busted
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
			   var bustedornot = parseInt(data.bustedviapolice);
			    
			   if (bustedornot == 1){
			   
			   $("#modal-busted").addClass("md-show");
              //animation
               $('.icon-surprised').addClass('animated bounce');
               $('.error .md-content button').addClass('animated fadeIn');
               $('.md-close').one( "click", function() {
               window.location.replace("index.html");
               }); 
			   
               localStorage.points  = Number(localStorage.points) - 30;
               localStorage.busted = Number(localStorage.busted) + 1;
               var data =  {
                      points: localStorage.points,
                      busted: localStorage.busted,
					  spraying: 0,
					  bustedviapolice: 0
                  }
			
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
	    		
				// Give notification of bust and point loss!!   
			     }).fail(function( jqXHR, textStatus ) {
                 alert("Second for venue: Something went wrong with bustcheck");
                 });
			   }
			   }).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("Third Error: Something went wrong with bustcheck");
              });
		
		//Then clear the roster and continue
		
        var authorization=localStorage.authorization;
		var color = localStorage.color;
        var venue2 = JSON.parse(localStorage.getItem('venueid')); 
		var venue = parseInt(venue2);
        
		var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
        var data =  {
				sprayinginitialized:0,
				gangsterSpraying: 0	
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
}
function getGangster() {
 
        var authorization=localStorage.authorization;
        var venue2 = JSON.parse(localStorage.getItem('venueid')); 
		var venue = parseInt(venue2);
		
		var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
		
               $.ajax({
             type: "GET",
             url: endpoint,
		     async: true, 
             dataType: 'json',
             beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", authorization);
                }
               }).done(function( data ) {
                localStorage.setItem('gangsterowns',JSON.stringify(data.gangster)); //takes a backup of who owns the venue... To prevent the ownership from moving in-case of bust
                }).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("Error: something went wrong while trying to establish ownership: "+ textStatus);
              }); 
	}
	
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
			   var bustedornot = parseInt(data.bustedviapolice);
			   return bustedornot;
			   
			   }).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("Third Error: Something went wrong with bustcheck");
              });
			  }