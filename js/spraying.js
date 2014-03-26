//Load venues or redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	  	var color = localStorage.color;
		var gangster = localStorage.gangster;
		mixpanel.track("PageLaunch", {page:"spraying", gang: color, gangster: gangster}); 
		sprayingInitialized();
        //Change color background depending on player's color
        $('body').removeClass().addClass(color)
        $("#can-spraying").attr("src", "img/can-"+color+".png" );
		$('.particle').removeClass().addClass("spray"+color);
		window.onunload=function(){sprayingInterrupted();}; //Sets spraying initialized back to 0 if interrupted... 
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
        jQuery("p#progress").delay(8000).fadeOut(1000);

        setTimeout(function() {
          registerSpray();
        }, 24000);

         jQuery("#loading").delay(26500).fadeOut(300);


    });

    // Animate.css
    jQuery(document).ready(function(){
            jQuery('p#prepare, p#progress').addClass('animated bounceInDown');
            jQuery('.load-wrap').addClass('animated wobble');
            jQuery('#can-spraying').addClass('animated pulse');
            jQuery('.showup').addClass('animated bounceInDown');
            jQuery('.disappear').addClass('animated bounceOutDown');
            jQuery('.overlay').addClass('animated fadeIn');
            jQuery('.points-earned').addClass('animated bounceInDown');
            jQuery('a#cancel').addClass('animated bounceInUp');
            // Delaying this button 16 seconds to animating out
            $('a#cancel').delay(16000).queue(function(){$('a#cancel').addClass('bounceOutDown')});

    });
  

    // Points animation
    //TODO: Calculate points
    jQuery({someValue: 0}).delay(24000).animate({someValue:100}, {
        duration: 1000,
        easing:'swing',
        step: function() {
           $('.points-earned span').text (Math.ceil(this.someValue) + "");
        }
      });

var registerSpray = function(venue) {

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
		mixpanel.track("SprayingFinalised", {Time:now, gang: color, gangster: gangster});

        $.ajax({
          type: "PATCH",
          url: endpoint,
          dataType: 'json',
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

            window.location.href = "index.html";
				}).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("First Error: something went wrong while updating the location: "+ textStatus);
              });


        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while updating the location: "+ textStatus);
        });
		}		
function sprayingInitialized(venue) { //SprayingInitialized to 1 in venue database

        var authorization=localStorage.authorization;
        var venue2 = JSON.parse(localStorage.getItem('venueid')); 
		var venue = parseInt(venue2);
        var gangster = localStorage.gangster;
		var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
        var data =  {
				sprayinginitialized:1,
				gangsterSpraying: gangster
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
              }).fail(function( jqXHR, textStatus ) {
              //TODO fix this
                alert("First Error: something went wrong while updating the location: "+ textStatus);
              });
		}
function sprayingInterrupted(venue) { 

        var authorization=localStorage.authorization;
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
                data: data,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", authorization);
                }
               }).done(function( data ) {

              }).fail(function( jqXHR, textStatus ) {
              //TODO fix this
                alert("First Error: something went wrong while updating the location: "+ textStatus);
              });
}
