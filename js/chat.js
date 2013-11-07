jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {

        //Change color background depending on player's color
        var color = localStorage.color;
        $('body').removeClass().addClass(color)      // GNMmenu.js
        new gnMenu( document.getElementById( 'gn-menu' ) );

      // Animate.css
        jQuery(document).ready(function(){
        jQuery('.chatter_msg_item').addClass('animated pulse');
        jQuery('.new').addClass('animated flash');
      });

    }
});
