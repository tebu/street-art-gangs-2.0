//Load venues or redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else if (!localStorage.venueid) {
	  window.location = "index.html";
	  }else{
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		var venue2 = JSON.parse(localStorage.getItem('venueid')); 
		var venue = parseInt(venue2);
		
		mixpanel.track("PageLaunch", {page:"spraying", gang: color, gangster: gangster, venue: venue}); 
		
		$('#cancel').on("click", function() { //sets checker to two oppose to 1 = busted or 0 = successful spray... this is for subspace
			    var checker = 2;
				localStorage.setItem('checker',checker); 
				mixpanel.track("SprayingInterruptionAttempt", {gang: color, gangster: gangster, venue: venue});
				});	
				
	    getGangster(); 
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
         }, 25000);

         jQuery("#loading").delay(24000).fadeOut(300);
        
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
		
//Take a backup of the original owner of the venue, in case 
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
                localStorage.setItem('gangsterowns',JSON.stringify(data.gangster)); //takes a backup of who owns the venue... To prevent the ownership from moving in-case of bust or interruption
                }).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("Error: something went wrong while trying to establish ownership: "+ textStatus);
              }); 
	}
	