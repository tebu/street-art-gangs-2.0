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
        
		if(localStorage.color === 'purple'){
		var gangKey = 0;}else if (localStorage.color === 'green'){ //0=Purple, 1=Green and 2=Blue, Apply only here n functionTags(), not equal to "gang" in gangsters database 
		var gangKey = 1;}else {var gangKey = 2;}
		
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
		
		  var list = $('.members-points-list');                 //Styling for the points list
		  for (var i = 0; i < gangMemberlist2.length; i++) {
		  var line = $("<li>");
		  $("<span>").addClass("icon-star").appendTo(line);
          $("<span>").addClass("member-points").text(gangMemberlist2[i][1]).appendTo(line);
		  $("<span>").addClass("member-name").text(gangMemberlist2[i][0]).appendTo(line);
		  list.append(line);
          };	
		 $.text(list);
		 
		var d = new Date();         //Current date to compare the timestamps with
		d.setHours(d.getHours()-2); //compensating for the timestamps being GMT
		
		for (var i = 0; i < gangMemberlist.length; i++) { //checking times and dates from gangMemberlist
			var curMonth = d.getMonth()+1 - gangMemberlist[i][3];
			var curDay = d.getDate() -gangMemberlist[i][4]; //placing more than a day mark for others...
			if (gangMemberlist[i][2] == 0000 || gangMemberlist[i][2] < 2014){
			   gangMemberlist[i][5] = 78;  //78 only to make sure these go to the end of the list, ugly I know, but it works
			   gangMemberlist[i][6] = 78;
			}else if (curMonth !=0 || curDay != 0){  
			   gangMemberlist[i][5] = 78;
			   gangMemberlist[i][6] = 78;
			}else{
			 var hours = gangMemberlist[i][5];
			 
			 gangMemberlist[i][5] = d.getHours()-hours;
			 var minutes = 0;
			 var minutes2= 0;
			 minutes = gangMemberlist[i][6]-d.getMinutes();
			 if (minutes >= 0)
			 {gangMemberlist[i][6] = minutes;
			 }else {
			 minutes2 = d.getMinutes()-gangMemberlist[i][6];
			 gangMemberlist[i][6] = minutes2;
			 }
			 }
          };
		  
	     var gangMemberlist3 = gangMemberlist.slice(0); 
		  gangMemberlist3.sort(function(a,b) { //Sorts order of the players by minutes
		  return a[6] - b[6];
		  }); 
		  gangMemberlist3.sort(function(a,b) { //Sorts order of the players by hours
		  return a[5] - b[5];
		  }); 

		 
		 var timeList = $('.members-list');      //Styling for the LastAction Modal
		  for (var i = 0; i < gangMemberlist.length; i++) {
		  var line = $("<li>");
		  $("<span>").addClass("icon-hourglass").appendTo(line);
		  
		  if (gangMemberlist3[i][5] == 78){ 
		$("<span>").addClass("member-time").text("Day or More").appendTo(line);
			}else if (gangMemberlist3[i][6] <= 9){
          $("<span>").addClass("member-time").text(gangMemberlist3[i][5]+":0"+gangMemberlist3[i][6]).appendTo(line);
			}else{
          $("<span>").addClass("member-time").text(gangMemberlist3[i][5]+":"+gangMemberlist3[i][6]).appendTo(line);
		    }
		  $("<span>").addClass("member-name").text(gangMemberlist3[i][0]).appendTo(line);
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
    
	function gangMembers(gangKey,data) { //Sort of gangsters by gang, points and handling the timestamp data              
			
			var gangList = [];
			var gangMember = "";
			var timeStamp = ""; 
			var timedate = "";
			var date = [];
			var clock = [];
			
			for (var i = data.length - 1; i >= 0; i--) {
			if (gangKey == 0 && data[i].color === "purple"){   //member, points and time for team purple
			gangMember = data[i].username;    
			
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T"); //Mebbe should put this into a function of its own
			timedate = timeStamp[0];
			var date2 = timedate.split("-"); 
            var year = parseInt(date2[0]); //year
			var month = parseInt(date2[1]); //month
			var day = parseInt(date2[2]); //day
			clock = timeStamp[1].split(":");
			var hours = parseInt(clock[0]); 
			var minutes = parseInt(clock[1]);
			
			} else {year = 0000; hours = 00; minutes = 00};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,year,month,day,hours,minutes]
			gangList.push(list);
			
			}else if (gangKey == 1 && data[i].color === "green"){ //member, points and time for team green
			gangMember = data[i].username;    	                            
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			timedate = timeStamp[0];
			var date2 = timedate.split("-"); 
            var year = parseInt(date2[0]); //year
			var month = parseInt (date2[1]); //month
			var day = parseInt (date2[2]); //day
			
			clock = timeStamp[1].split(":");
			
			var hours = parseInt(clock[0]); 
			var minutes = parseInt(clock[1]);
			
			} else {year = 0000; hours = 00; minutes = 00};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,year,month,day,hours,minutes]
			gangList.push(list);
			
			}else if (gangKey == 2 && data[i].color === "blue"){ 
			gangMember = data[i].username;                     //member, points and time for team blue		
			if (data[i].last_action != null){ timeStamp = data[i].last_action.split("T");
			timedate = timeStamp[0];
			var date2 = timedate.split("-"); 
            var year = parseInt(date2[0]); //year
			var month = parseInt(date2[1]); //month
			var day = parseInt(date2[2]); //day
			
			clock = timeStamp[1].split(":");
			
			var hours = parseInt(clock[0]); 
			var minutes = parseInt(clock[1]);
			
			} else {year = 0000; hours = 00; minutes = 00};
			gangsterPoints = data[i].points;
			var list = [gangMember,gangsterPoints,year,month,day,hours,minutes]
			gangList.push(list);
			}
			}
			return gangList;
			}
			 
    });


