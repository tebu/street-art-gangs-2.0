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
        
		for(var i = 0; i <= 2; i++){
		if(data[i].color === color){
		var gangKey = i;}}
		
		
		var gangMemberlist = gangMembers(gangKey,data); //Separates gangs from gangsters
		
		var gangTagsPoints2 = [];
	    for (var i = 0; i <= 2; i++) {  //0=Purple, 1=Green and 2=Blue, Apply only here n functionTags(), not equal to "gang" in gangsters database 
		var gangTagsPoints = functionTags (i, data);
		gangTagsPoints2.push(gangTagsPoints);  
		} 
		
          $("#name").text(gangTagsPoints2[gangKey][2]);
		  $(".description").text("Tagged by "+gangTagsPoints2[gangKey][2]);
          if (gangKey == 0){
		  $("#legend").text("Chivalry is not dead it just has a new definition at the other end of the spectrum... of visible light. Instead of brute force these knights apply paint.");
		  } else if (gangKey == 2) { $("#legend").text("There are the sublime and the fallen ones and then there are those in between. All are welcome to spread the gospel of 'This city belongs to the Angels.'");
		  } else if (gangKey == 1) { $("#legend").text("An eclectic mix of green peas and biohactivists who aim to reclaim the city for mother nature. Some say they have magic, some say they just are contagious.");}
		  
		  $(".gang-info.members").text(gangTagsPoints2[gangKey][1]);
		  $(".gang-info.points").text(gangTagsPoints2[gangKey][0]);
		  
		  /* $(".gang-info.walked").text(gangTagsPoints2[gangKey][?]); */ //NEEDS TO BE DONE LATER
		  
          //TODO: Add points
          //TODO Add random latest Action to the events
 		  
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
		 
		var d = new Date(); 
		
		for (var i = 0; i < gangMemberlist.length; i++) { //checking and placing the order for times and dates
		    var date2 = gangMemberlist[i][2].split(":"); 
			var date = [];
            date[0] = parseInt(date2[0]);
			date[1] = parseInt (date2[1]);
			
			var curMonth = d.getMonth()+1 - date[1];
			var curDay = d.getDate() -date[2]; //placing more than a day mark for others...
			if (date [0] == 0000 || date [0] < 2014){
			   gangMemberlist[i][3] = "Day or More";
			}else if (curMonth !=0 || curDay != 0){  // JATKA TÄSTÄ
			   gangMemberlist[i][3] = "Day or More";
			}else {
			var hours = d.getHours()+1 - gangMemberlist[i][3];  
			var minutes = d.getMinutes()+1 - gangMemberlist[i][4];
			gangMemberlist[i][3] = hours;
			gangMemberlist[i][4] = minutes;
				}
          };
	
		 
		 var timeList = $('.members-list');                 //Styling for the list with timestamps not yet in order... A check for how long t has been TODO
		  for (var i = 0; i < gangMemberlist.length; i++) {
		  var line = $("<li>");
		  $("<span>").addClass("icon-hourglass").appendTo(line);
		  
		  if (gangMemberlist[i][3] === "Day or More"){ 
		$("<span>").addClass("member-time").text("Day or More").appendTo(line);
			}else{
          $("<span>").addClass("member-time").text(gangMemberlist[i][3]+":"+gangMemberlist[i][4]).appendTo(line);
		    }
		  
		  $("<span>").addClass("member-name").text(gangMemberlist[i][0]).appendTo(line);
		  timeList.append(line);
          };	
		  $.text(timeList);
		 
        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the profile: "+ textStatus);
        });
		
      }
	  
	 function functionTags(gangKey, data){ //Gang tags,points,name and population by gangsters combined
			
			var gangName = "";
			var gangPoints = 0;
			var gangPopulation = 0;
			
			for (var i = data.length - 1; i >= 0; i--) {
			if (gangKey == 0 && data[i].color === "purple"){
			gangPoints += data[i].points;//points and tags for team purple	
			gangPopulation ++;
			gangName = "Purple Knights";
			}else if (gangKey == 1 && data[i].color === "green"){
			gangPoints += data[i].points; //points and tags for team green
			gangPopulation ++;
			gangName = "Green Shamans";
			}else if (gangKey == 2 && data[i].color === "blue"){ 
			gangPoints += data[i].points; //points and tags for team blue
			gangPopulation ++;
			gangName = "Blue Angels";
			}
			}
			return [gangPoints,gangPopulation,gangName];
			} 
    
	function gangMembers(gangKey,data) {	                
			
			var gangList = [];
			var gangMember = "";
			var timeStamp = ""; 
			var date = "";
			var clock = "";
			
			
			for (var i = data.length - 1; i >= 0; i--) {
			
			if (gangKey == 0 && data[i].color === "purple"){   //member, points and time for team purple
			gangMember = data[i].username;    		
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			date = timeStamp[0]; 
			hours2 = timeStamp[1].slice(0,1);
			hours = parseInt(hours2);
			hours + 2;        //From GMT to local time
			minutes2 = timeStamp[1].slice(4,5);
			minutes = parseInt(minutes2);
			} else {date = "0000:00:00"; hours = 00; minutes = 00};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,date,clock]
			gangList.push(list);
			
			}else if (gangKey == 1 && data[i].color === "green"){ //member, points and time for team green
			gangMember = data[i].username;    	
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			date = timeStamp[0]; 
			hours2 = timeStamp[1].slice(0,1);
			hours = parseInt(hours2);
			hours + 2;        //From GMT to local time
			minutes2 = timeStamp[1].slice(4,5);
			minutes = parseInt(minutes2);
			} else {date = "0000:00:00"; hours = 00; minutes = 00};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,date,clock]
			gangList.push(list);
			
			}else if (gangKey == 2 && data[i].color === "blue"){ 
			gangMember = data[i].username;                     //member, points and time for team blue		
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			date = timeStamp[0]; 
			hours2 = timeStamp[1].slice(0,1);
			hours = parseInt(hours2);
			hours + 2;        //From GMT to local time
			minutes2 = timeStamp[1].slice(4,5);
			minutes = parseInt(minutes2);
			} else {date = "0000:00:00"; hours = 00; minutes = 00};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,date,hours,minutes]
			gangList.push(list);
			}
			}
			return gangList;
			}
			 
   
    });


