jQuery(document).ready(function(){

       if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
         window.location.replace("splash.html");
       } else {
	   	var color = localStorage.color;
		var gangster = localStorage.gangster;
		watchGPS();
		var locationLatitude = localStorage.latitude; //gangster location
		var locationLongitude = localStorage.longitude;
		var loc = "" + locationLatitude + locationLongitude;
		window.alert = function(){return null;}; //Javascript popups disabled, geo js seems to cause
		
		mixpanel.register({gang: color, gangster: gangster, loc: loc});
		mixpanel.track("PageLaunch", {page:"faq"});
        //Change color background depending on player's color
        
        $('body').removeClass().addClass(color)

        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );
     }

	//Accordion - Expand/Hide FAQs
     $(".faq-trigger").click(function () {
            if ($(this).hasClass('open')){
                $(this).next('.faq-content').slideUp('slow');
                $(this).removeClass('open');
                $(this).removeClass('highlight');
            }
            else {
              // close other content
              $('.faq-trigger').not(this).next('.faq-content').slideUp('slow');
              $('.faq-trigger').not(this).removeClass('open');
              $('.faq-trigger').not(this).removeClass('highlight');
            
              //open clicked content
              $(this).next('.faq-content').slideDown('slow');
              // add open class
              $(this).addClass('open');
              $(this).addClass('highlight');
			  var identLink = "#"; 
			  identLink += this.id;
			  mixpanel.track("ClicksOnHelp", {"helpTrigger": ""+identLink+""});
			  mixpanel.track("PageLaunch", {page:"gangprofile"});
            }
          });

});
