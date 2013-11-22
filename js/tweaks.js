jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {

        //Change color background depending on player's color
        var color = localStorage.color;
        $('body').removeClass().addClass(color)

        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );

        //On .btn.btntxt click
        $('.confirm').one( "click", function() {
            localStorage.clear();
            window.location.replace("splash.html");
        });
    }

});
