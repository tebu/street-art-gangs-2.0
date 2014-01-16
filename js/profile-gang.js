      //Load venues or redirect
      jQuery(document).ready(function(){

        //Animate.css
        $('.tile').addClass('animated slideInLeft');


       if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
         window.location.replace("splash.html");
       } else {
	   	var color = localStorage.color;
		var gangster = localStorage.gangster;
		
		mixpanel.track("PageLaunch", {page:"gangprofile", gang: color, gangster: gangster});

        //Change color background depending on player's color
        $('body').removeClass().addClass(color)

        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );




        //Get Profile
        var authorization=localStorage.authorization;
        var gang = localStorage.gang;
        var endpoint = "http://vm0063.virtues.fi/gangsters/";
        $.ajax({
          type: "GET",
          url: endpoint,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {
          //Populate Gang
		 
	    var gangTagsPoints2 = [];    
		
		var gangMemberlist = gangMembers(); //JATKA TÄSTÄ
		
	    for (var i = 0; i < 3; i++) {  //1=Purple, 2=Blue and 3=Green, Apply only here n functionTags(), not equal to "gang" in gangsters database 
		var gangTagsPoints = functionTags (i, data);   //Makes an array of gang's full population and points
		gangTagsPoints2.push(gangTagsPoints);  
		} 
		
		  if (color == "purple"){
		  gangKey = 0;}else if (color == "blue"){
		  gangKey = 1;}else if (color == "green"){
		  gangKey = 3;}
		  
          $("#name").text(gangTagsPoints2[gangKey][1]); 
          $(".gang-info.members").text(gangTagsPoints2[gangKey][2]);
		  $(".gang-info.points").text(gangTagsPoints2[gangKey][0]);
		  
		  /* $(".gang-info.walked").text(gangTagsPoints2[gangKey][?]); */ //NEEDS TO BE DONE LATER
		  
          //TODO: Add points
          //TODO Add Best player
          //TODO Add Last Action
		  
		  
		  /* for (var i = 0; i < gangMemberlist.length; i++) {
          var line = $("<li>");
         
          $(".member-time").text(gangMemberlist[i].timeStamp);
		  $.text(gangMembers2[i].gangMemberlist).appendTo(line);
         
          .append(line);
        } */	


        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the profile: "+ textStatus);
        });
		
      }
	  
	 function functionTags(counterValueGang, data){ //Gang tags,points,name and population by gangsters combined
			counterValueGang++;
			var gangName = "";
			var gangPoints = 0;
			var gangPopulation = 0;
			for (var i = data.length - 1; i >= 0; i--) {
			if (counterValueGang == 1 && data[i].color == "purple"){
			gangPoints += data[i].points;//points and tags for team purple	
			gangName = "Purple Knights";
			gangPopulation ++;
			}else if (counterValueGang == 2 && data[i].color == "blue"){
			gangPoints += data[i].points; //points and tags for team blue
			gangName = "Blue Angels";
			gangPopulation ++;
			}else if (counterValueGang == 3 && data[i].color == "green"){ 
			gangPoints += data[i].points; //points and tags for team green
			gangName = "Green Shamans";
			gangPopulation ++;
			}
			}
			return [gangPoints,gangName,gangPopulation];
			} 
    
	function gangMembers() {	
			var authorization=localStorage.authorization;
			var gangster = localStorage.gangster;
			var gang = localStorage.gang;
			var endpoint = "http://vm0063.virtues.fi/gangsters/?gang="+gang;
			$.ajax({
			type: "GET",
			url: endpoint,
			dataType: 'json',
			beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", authorization);
			}
			}).done(function( data ) {
			
			var gangList2 = [];
			var gangMember = "";
			var timeStamp = ""; //TODO string to integer to order to cuter time 
			for (var i = data.length - 1; i >= 0; i--) {
			gangMember = data[i].username; 
			timeStamp = data[i].last_action;
			gangsterPoints = data[i].points;
			var gangList = [gangMember,timeStamp,gangsterPoints];
			gangList2.push[gangMember,timeStamp,gangsterPoints];
			}
			return gangList2;
			})
			}
			 
   
    });


