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
	  var gangTagsPoints2 = new Array();                                
	   for (var i = 0; i < 3; i++) {  //1=Purple, 2=Blue and 3=Green, Apply only here, not equal to "gang" in gangsters database 
	    var gangNumber = i+1;
		var gangName = functionName(i);
		var gangTagsPoints = functionTags (i, data);
		
		gangTagsPoints2[i-1] = new Array(gangTagsPoints);  //TODO Sort these in order by points
		
		
		for (var j = gangTagsPoints2.length - 1; j >= 0; j--) {      //JATKA TÄSTÄ
        var line = $("<tr>");
        $("<td>").text(j).appendTo(line);
        $("<td>").text(gangTagsPoints2[j].gangName).appendTo(line); //GangName
        $("<td>").text(gangTagsPoints2[j].gangTags).appendTo(line); //Tags Created by Gang
        $("<td>").text(gangTagsPoints2[j].gangPoints).appendTo(line); //Full Points by Gang
        table.append(line);
		}
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
		var data2 = data.slice(0);
		data2.sort(function(a,b) { return parseFloat(b.points) - parseFloat(a.points) } );

        for (var i = 0; i < data2.length; i++) {
          var line = $("<tr>");
          $("<td>").text(i+1).appendTo(line);
          $("<td>").text(data2[i].username).appendTo(line);
          $("<td>").text(data2[i].tags_created).appendTo(line); //TODO: insert tags created
          $("<td>").text(data2[i].points).appendTo(line); //TODO: insert points
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
			if (counterValueGang == 1 && data[i].color == "purple"){
			gangTags += data[i].tags_created;   //points and tags for team purple		
			gangPoints += data[i].points;
			gangName = "Purple Knights";
			}else if (counterValueGang == 2 && data[i].color == "blue"){
			gangTags += data[i].tags_created; //points and tags for team blue
			gangPoints += data[i].points;
			gangName = "Blue Angels";
			}else if (counterValueGang == 3 && data[i].color == "green"){ 
			gangTags += data[i].tags_created;//points and tags for team green
			gangPoints += data[i].points;
			gangName = "Green Shamans";
			}
			}
   return [gangTags,gangPoints,gangName];
   }
   
 });
