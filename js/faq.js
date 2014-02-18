jQuery(document).ready(function(){

       if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
         window.location.replace("splash.html");
       } else {
	   	var color = localStorage.color;
		var gangster = localStorage.gangster;
		
		mixpanel.track("PageLaunch", {page:"faq", gang: color, gangster: gangster});
		
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
              $(this).addClass('highlight')
            }
          });

});
