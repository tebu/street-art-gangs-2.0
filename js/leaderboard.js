//Animate.css
 $(document).ready(function(){

  if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang){
    window.location.replace("splash.html");
  } else {
	var color = localStorage.color;
	var gangster = localStorage.gangster;
		
	mixpanel.track("PageLaunch", {page:"leaderboard", gang: color, gangster: gangster});
    //Menu
    new gnMenu( document.getElementById( 'gn-menu' ) );

    //Change color background depending on player's color
    $('body').removeClass().addClass(color);

    /*var endpoint = "http://vm0063.virtues.fi/gangs/"; */   //Rejected the use of gang data for now, for the lack of points there
    var endpoint2 = "http://vm0063.virtues.fi/gangsters/";

    var authorization=localStorage.authorization;

//Load Gangs Leaderboard

    $.ajax({
      type: "GET",
      url: endpoint2,
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", authorization);
      }
    }).done(function( data ) {

      var table = $('#gang-board');
	  
	   for (var i = 0; i < 3; i++) {  //1=Purple, 2=Blue and 3=Green, Apply only here, not equal to "gang" in gangsters database 
	    var gangNumber = i+1;
		var gangName = functionName(i);
		var gangTagsPoints = functionTags (i, data);
		
        var line = $("<tr>");
        $("<td>").text(i+1).appendTo(line);
        $("<td>").text(gangName).appendTo(line);
        $("<td>").text(gangTagsPoints[0]).appendTo(line); //TODO: insert tags created
        $("<td>").text(gangTagsPoints[1]).appendTo(line); //TODO: insert points
        table.append(line);
      };

	  
		
//Load Players Leaderboard

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

      // Swiper starts
      var mySwiper = new Swiper('.swiper-container',{
          pagination: '.pagination',
          mode : 'horizontal',
          loop: false,
          grabCursor: true,
          paginationClickable: true,
          calculateHeight: true
      })
      $('.arrow-left').on('click', function(e){
          e.preventDefault()
          mySwiper.swipePrev()
      })
      $('.arrow-right').on('click', function(e){
          e.preventDefault()
          mySwiper.swipeNext()
      })
      // Swiper ends


      }).fail(function( jqXHR, textStatus ) {
      //TODO fix this
        alert("Error: something went wrong while loading the players leaderboard: "+ textStatus);
      });


    }).fail(function( jqXHR, textStatus ) {
    //TODO fix this
      alert("Error: something went wrong while loading the gangs leaderboard: "+ textStatus);
    });

      // Animation
     $('th').addClass('animated slideInRight');
     $('td').addClass('animated slideInLeft');
   }
   
   function functionName(counterValueGang){ //Gang Names by counter value
			counterValueGang++;
			if (counterValueGang == 1) {
			gangName = "Purple Knights";
			}else if (counterValueGang == 2){
			gangName = "Blue Angels";
			}else{ 
			gangName = "Green Shamans";
			}
   return gangName;
   }
   
	function functionTags(counterValueGang, data){ //Gang tags by gangsters 
			counterValueGang++;
			var gangTags = 0;
			var gangPoints = 0;
			for (var i = data.length - 1; i >= 0; i--) {
			if (counterValueGang == 1 && data[i].color == "purple") {
			gangTags += data[i].tags_created;   //points and tags for team purple		
			gangPoints += data[i].points;
			}else if (counterValueGang == 2 && data[i].color == "blue"){
			gangTags += data[i].tags_created; //points and tags for team blue
			gangPoints += data[i].points;
			}else if (counterValueGang == 3 && data[i].color == "green"){ 
			gangTags += data[i].tags_created;//points and tags for team green
			gangPoints += data[i].points;
			}
			}
   return [gangTags,gangPoints];
   }
   
 });
