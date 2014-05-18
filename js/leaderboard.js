//Animate.css
 $(document).ready(function(){

  
	var color = "purple";
	var gangster = 18;
		
	mixpanel.track("PageLaunch", {page:"leaderboard", gang: color, gangster: gangster});
    //Menu
    new gnMenu( document.getElementById( 'gn-menu' ) );

    //Change color background depending on player's color
    $('body').removeClass().addClass(color);

    var endpoint2 = "http://vm0063.virtues.fi/gangsters/";


//Load Gangs Leaderboard

    $.ajax({
      type: "GET",
      url: endpoint2,                              //TODO Combine the data requests
      dataType: 'json',
      beforeSend: function (xhr) {
        
      }
    }).done(function( data ) {

      var table = $('#gang-board');
	  var gangTagsPoints2 = [];    
	  
	   for (var i = 0; i < 3; i++) {  //1=Purple, 2=Blue and 3=Green, Apply only here n functionTags(), not equal to "gang" in gangsters database 

		var gangTagsPoints = functionTags (i, data);
		gangTagsPoints2.push(gangTagsPoints);  
		}
		
		gangTagsPoints2 = gangTagsPoints2.sort(function(a,b) { //Sorts order by points
		return b[1] - a[1];
		});
		
		for (var j = 0; j <= 2; j++) {      
        var line = $("<tr>");
        $("<td>").text(j+1).appendTo(line);
        $("<td>").text(gangTagsPoints2[j][2]).appendTo(line); //GangName
        $("<td>").text(gangTagsPoints2[j][0]).appendTo(line); //Tags Created by Gang
        $("<td>").text(gangTagsPoints2[j][1]).appendTo(line); //Full Points by Gang
        table.append(line);
		};
      


//Load Players Leaderboard

      $.ajax({
        type: "GET",
        url: endpoint2,
        dataType: 'json',
        beforeSend: function (xhr) {
         
        }
      }).done(function( data ) {

        
		var data2 = data.slice(0);
		data2.sort(function(a,b) { return parseFloat(b.points) - parseFloat(a.points) } );

		var table = $('#player-board');
        //TODO: limit number of lines and select you
        for (var i = 0; i < data2.length; i++) {
          var line = $("<tr>");
          $("<td>").text(i+1).appendTo(line);
          $("<td>").text(data2[i].username).appendTo(line);
          $("<td>").text(data2[i].tags_created).appendTo(line); //tags created
          $("<td>").text(data2[i].points).appendTo(line); //points
          table.append(line);
        };

      // Swiper starts
     /*
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
*/
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
      $('table').addClass('animated slideInLeft');



   
   
	function functionTags(counterValueGang, data){ //Gang tags,points and name by gangsters combined
			counterValueGang++;
			var gangName = "";
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
