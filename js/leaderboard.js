//Animate.css
 $(document).ready(function(){

  if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang){
    window.location.replace("splash.html");
  } else {
    //Menu
    new gnMenu( document.getElementById( 'gn-menu' ) );

    //Change color background depending on player's color
    var color = localStorage.color;
    $('body').removeClass().addClass(color);

    var endpoint = "http://vm0063.virtues.fi/gangs/";
    var endpoint2 = "http://vm0063.virtues.fi/gangsters/";

    var authorization=localStorage.authorization;

//Load Gangs Leaderboard

    $.ajax({
      type: "GET",
      url: endpoint,
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", authorization);
      }
    }).done(function( data ) {

      var table = $('#gang-board');

      for (var i = 0; i < data.length; i++) {
        var line = $("<tr>");
        $("<td>").text(i+1).appendTo(line);
        $("<td>").text(data[i].name).appendTo(line);
        $("<td>").text(643636).appendTo(line); //TODO: insert tags created
        $("<td>").text(43643).appendTo(line); //TODO: insert points
        table.append(line);
      };

    }).fail(function( jqXHR, textStatus ) {
    //TODO fix this
      alert("Error: something went wrong while loading the profile: "+ textStatus);
    });


    $.ajax({
      type: "GET",
      url: endpoint2,
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", authorization);
      }
    }).done(function( data ) {

      var table = $('#player-board');
      //TODO: limit number of lines and select you
      for (var i = 0; i < data.length; i++) {
        var line = $("<tr>");
        $("<td>").text(i+1).appendTo(line);
        $("<td>").text(data[i].username).appendTo(line);
        $("<td>").text(643636).appendTo(line); //TODO: insert tags created
        $("<td>").text(43643).appendTo(line); //TODO: insert points
        table.append(line);
      };

    }).fail(function( jqXHR, textStatus ) {
    //TODO fix this
      alert("Error: something went wrong while loading the profile: "+ textStatus);
    });

    $('#leaderboards').liquidSlider({
      slideEaseDuration: 500,
      slideEaseFunction: "easeInOutExpo",
      dynamicArrows: false
    });


     $('table#gang-board').addClass('animated slideInRight');
     $('h4').addClass('animated pulse');
     $('.icon-trophy').addClass('animated slideInDown');
   }
 });
