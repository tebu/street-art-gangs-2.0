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
        
        var endpoint = "http://vm0063.virtues.fi/gangsters/";
        $.ajax({
          type: "GET",
          url: endpoint,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {
        
		for(var i = 2; i >= 0; i--){
		if(data[i].color === color){
		var gangKey = i+1;}}
		
		
		var gangMemberlist = gangMembers(gangKey,data); //JATKA TÄSTÄ
		//gangMemberlist.sort(function(a,b) { return parseFloat(b.[1]) - parseFloat(a.[1]) } );
		
		var gangTagsPoints2 = [];
	    for (var i = 0; i < 3; i++) {  //1=Purple, 2=Blue and 3=Green, Apply only here n functionTags(), not equal to "gang" in gangsters database 
		var gangTagsPoints = functionTags (i, data);
		gangTagsPoints2.push(gangTagsPoints);  
		} 
		
          $("#name").text(gangTagsPoints2[gangKey][1]); 
          $(".gang-info.members").text(gangTagsPoints2[gangKey][2]);
		  $(".gang-info.points").text(gangTagsPoints2[gangKey][0]);
		  
		  /* $(".gang-info.walked").text(gangTagsPoints2[gangKey][?]); */ //NEEDS TO BE DONE LATER
		  
          //TODO: Add points
          //TODO Add Last Action
		  
		  var gangMemberlist2 = gangMemberlist.slice(0); 
		  gangMemberlist2.sort(function(a,b) { //Sorts order by points
		  return b[1] - a[1];
		  }); 
		
		  var list = $('.members-points-list');                 //Something on the lines of last action list of players add comparison of day and then clock time
		  for (var i = 0; i < gangMemberlist2.length; i++) {
		  var line = $("<li>");
		  $("<span>").addClass("icon-star").appendTo(line);
          $("<span>").addClass("member-points").text(gangMemberlist2[i][1]).appendTo(line);
		  $("<span>").addClass("member-name").text(gangMemberlist2[i][0]).appendTo(line);
		  list.append(line);
          };	
		 $.text(list);

		 var timeList = $('.members-list');                 //Styling for the list with timestamps not yet in order... A check for how long t has been TODO
		  for (var i = 0; i < gangMemberlist.length; i++) {
		  var line = $("<li>");
		  $("<span>").addClass("icon-hourglass").appendTo(line);
          $("<span>").addClass("member-time").text(gangMemberlist[i][3]).appendTo(line);
		  $("<span>").addClass("member-name").text(gangMemberlist[i][0]).appendTo(line);
		  timeList.append(line);
          };	
		  $.text(timeList);
		 
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
    
	function gangMembers(gangKey,data) {	                
			
			var gangList = [];
			var gangMember = "";
			var timeStamp = ""; 
			var date = "";
			var clock = "";
			
			for (var i = data.length - 1; i >= 0; i--) {
			
			if (gangKey == 1 && data[i].color === "purple"){   //member, points and time for team purple
			gangMember = data[i].username;    		
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			date = timeStamp[0]; 
			clock = timeStamp[1].slice(0,8);} else {date = "0000-00-00"; clock="00-00-00"};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,date,clock]
			gangList.push(list);
			}else if (gangKey == 2 && data[i].color === "blue"){ //member, points and time for team blue
			gangMember = data[i].username;    	
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			date = timeStamp[0]; 
			clock = timeStamp[1].slice(0,8);} else {date = "0000-00-00"; clock="00-00-00"};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,date,clock]
			gangList.push(list);
			}else if (gangKey == 3 && data[i].color === "green"){ 
			gangMember = data[i].username;                     //member, points and time for team blue		
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			date = timeStamp[0]; 
			clock = timeStamp[1].slice(0,8);} else {date = "0000-00-00"; clock="00-00-00"};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,date,clock]
			gangList.push(list);
			}
			}
			return gangList;
			}
			 
   
    });


