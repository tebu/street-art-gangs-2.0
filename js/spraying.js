//Load venues or redirect
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
        //Change color background depending on player's color
        var color = localStorage.color;
        $('body').removeClass().addClass(color)


      }

});

      // Pervcentage loading
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
        // jQuery("p#finished").delay(19000).fadeIn(500);

        setTimeout(function() {
          registerSpray();
        }, 20000);

         jQuery("p#finished").delay(20000).fadeOut(300);
         jQuery("#loading").delay(22000).fadeOut(300);

        // Redirect to home screen after finished spraying
        setTimeout(function() {
          window.location.href = "index.html";
        }, 27000);
    });

    // Animate.css
    jQuery(document).ready(function(){
            jQuery('p#prepare, p#progress, p#finished').addClass('animated bounceInDown');
            jQuery('.load-wrap').addClass('animated wobble');
            jQuery('#can-spraying').addClass('animated pulse');
            jQuery('.showup').addClass('animated bounceInDown');
            jQuery('.disappear').addClass('animated bounceOutDown');
            jQuery('.overlay').addClass('animated fadeIn');
            jQuery('.points-earned').addClass('animated bounceInDown');
    });

    // Points animation
    //TODO: Calculate points
    jQuery({someValue: 0}).delay(23000).animate({someValue:1260}, {
        duration: 1000,
        easing:'swing',
        step: function() {
           $('.points-earned span').text (Math.ceil(this.someValue) + "");
        }
      });

var registerSpray = function() {

        var authorization=localStorage.authorization;
        var gangster = localStorage.gangster;
        //var venue = localStorage.venue;
        var venue = 2; //TODO change with stored venue
        var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
        var now = moment().format();
        var data =  {
                gangster: gangster,
                latestEditTimestamp: now
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
          alert("Error: something went wrong while updating the location: "+ textStatus);
        });



}
