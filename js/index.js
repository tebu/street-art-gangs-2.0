
			
jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location = "splash.html";
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		var locationLatitude = localStorage.latitude; //gangster location
		var locationLongitude = localStorage.longitude;
		var loc = "" + locationLatitude + locationLongitude;	 
		localStorage.removeItem('venueid');
		localStorage.removeItem('checker');
		localStorage.removeItem('gangsterowns');
		localStorage.removeItem('wassit');
		mixpanel.register({gang: color, gangster: gangster, loc: loc}); //Track for the droplet click is in index.html
		mixpanel.track("PageLaunch", {page:"index"});
	    mixpanel.track_links("BustCheck", {".bustButton": "bustInitiated"});
		//Change color background depending on player's color
         $('body').removeClass().addClass(color);
        
		//Check GPS
        watchGPS();
		//$('#to-left', '#to-right').on
		
        //Menu
        new gnMenu( document.getElementById( 'gn-menu' ) );
        
        //Get Venues
        var authorization=localStorage.authorization;
        var endpoint = "http://vm0063.virtues.fi/venues/";
        $.ajax({
          type: "GET",
          url: endpoint,
		  async: true, 
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
          }).done(function( data ) {
			
			var venueArr = distanceSort(data);
			updateVenueslider(data, venueArr);
			
			/* setInterval(function() {          //REFRESH UNDER WORK
		     var venueArr = distanceSort(data);
			 //refreshDistances(venueArr);
			}
			,5000); */
			
				
          // Venue slider
          $('#main-slider').liquidSlider({
              hashLinking:false,
              crossLinks:true,
              includeTitle:true,
              mobileNavigation:false,
              firstPanelToLoad:1, 
              autoHeight:false,
              minHeight: 0,
              swipe: true,
              hideArrowsWhenMobile: true,
              dynamicArrows: false,
              slideEaseFunction:'easeInOutCubic',
              slideEaseDuration:400,
              heightEaseDuration:800

            // animateIn:"slideInLeft",
            // animateOut:"slideOutLeft"
          });

          jQuery("h1.location").fitText(1.25, { minFontSize: '16px', maxFontSize: '60px' })
          // jQuery(".category").fitText(1, { minFontSize: '10px', maxFontSize: '60px' })
          jQuery("h3.title").fitText(3, { minFontSize: '9px', maxFontSize: '30px' })

        }).fail(function( jqXHR, textStatus ) {
        //TODO fix this
          alert("Error: something went wrong while loading the venues");
        });
        
		//}
		//Counting the distances between player and location, called from distanceSort()
function locationCheck(data,key,locationLat, locationLon, venueLat, venueLon){
         
         // Compute spherical coordinates
           var rho = 6378.16; // earth ray in meters
           // convert latitude and longitude to spherical coordinates in radians, phi = 90 - latitude
           var phi_1 = (90.0 - locationLat)*Math.PI/180.0;
           var phi_2 = (90.0 - venueLat)*Math.PI/180.0;
         // theta = longitude
           var theta_1 = locationLon*Math.PI/180.0;
           var theta_2 = venueLon*Math.PI/180.0;
            // compute spherical distance from spherical coordinates
            // arc length = \arccos(\sin\phi\sin\phi'\cos(\theta-\theta') + \cos\phi\cos\phi')
           // distance = rho times arc length
           var distance = rho*Math.acos( Math.sin(phi_1)*Math.sin(phi_2)*Math.cos(theta_1 - theta_2) + Math.cos(phi_1)*Math.cos(phi_2) );
		   for (var i = data.length - 1; i >= 0; i--) {
           data[key].distance = distance; // adds distance to venue data, for sorting
		   var owned =data[key].gang; //adds owner to venue data for placing the owned location to the end of array
			}
			
         }	

		 //Updating the slider content
function updateVenueslider (data,arraySorted){
			
		    for (var i = 0; i <= 15; i++) { //data.length - 1 replaced with 15 -1, to make the slider lighter

			var j = arraySorted[i][0]; //[i][0] the venue's location in data from the sorted array... 

            var venue = $("<div>").toggleClass( 'venue' );
            var owner = $("<p>").addClass("owner");
			var venueId = data[j].id;	
			var locator = "#";
			locator += venueId; 
			
			var distanceId = data[j].id+"Dist"; //Creates individual id for distance (venueId + "Distance") for updating that on index page
			
			var locator2 = "#";
			var bustId = data[j].id+"bust"; //Creates individual id for bustlogo (venueId + "bust") for updating that on index page
			locator2 += bustId;             //Creates individual id for bustlogo on click event
			
            var gang = data[j].gang;
            if (gang != null) {
              // owner.append("Tagged by ");
              $("<span>").addClass(gang+"-owns").text(gang).appendTo(owner);
              owner.appendTo(venue);
            } else {
              owner.append("Untagged").appendTo(venue);
            }
			  //place bust button only to few first venues, hard-coded for four less than there are venues on the slider!
			
			if (i < 3){ 
			$("<button>").addClass("bustButton").attr('id',bustId).appendTo(venue); 
			$('body').on("click", locator2, function() {
			    
			    localStorage.setItem('bustId',JSON.stringify(this.id)); 
				bustCheck(bustId); //check for spraying gangsters close by based on venueId
				
				});	
				}
			
			 
            $("<div>").addClass("category").addClass(getCategoryClass(data[j].category)).appendTo(venue);
            $("<h3>").addClass("title").text(getCategory(data[j].category)).appendTo(venue);
			$("<h1>").addClass("location").text(data[j].name).appendTo(venue);
			
			var distance = data[j].distance;
			var distance2 = distance*1000;                // Shows the distance from the venue 
			var distance3 = distance2.toFixed(0); 
			$("<p>").attr('id',distanceId).text(""+distance3+"m").appendTo(venue); //
			
			if(localStorage.gang == 5){ var gangName="Purple Knights"; //this is for not allowing the gang tag same loc twice
		    }else if(localStorage.gang == 6){
		    var gangName="Green Shamans";
			}else if(localStorage.gang == 7){
		    var gangName="Blue Knights";
			}else{var gangName="Gray Grays";
			};
			
			if (distance <=0.035 && gang !== gangName && data[j].sprayinginitialized == 0) {	//35 m from the location 	

			$("<div>").attr('id','#start-to-spray').append("<a id="+venueId+" class='spray icon-droplet'  href='spraying.html'></a>").appendTo(venue);
			
			$('body').on("click",locator, function() {
				localStorage.setItem('venueid',JSON.stringify(this.id)); //Sends individual droplet icon id to spraying page	
				});	

			}else if (distance >0.035&& distance<=0.070){

		
			$("<div>").attr('id','#maybe-to-spray').append("<a id="+venueId+" class='maybespray icon-droplet'</a>").appendTo(venue); //blinking droplet
			}else{ 
		
			$("<div>").attr('id','#not-to-spray').append("<a id="+venueId+" class='notspray icon-droplet'></a>").appendTo(venue);//inactive droplet 
			}
			$("<br>").appendTo(venue);
			
            $('#main-slider').append(venue);
          };
		 } //Updating the slider content function ends	 
		 
		 //Distance Check and Array from distance sorting and Placing the owned venues to the end of Array
function distanceSort (data){
            locationLatitude = localStorage.latitude; //gangster location needs to be rechecked
		    locationLongitude = localStorage.longitude;

            for (var i = data.length - 1; i >= 0; i--) { //Distance checks from venues
			var venueLatitude = data[i].latitude;
		    var venueLongitude = data[i].longitude;
		    var distance = locationCheck(data,i,locationLatitude,locationLongitude,venueLatitude,venueLongitude); 
			var gang = localStorage.gang;
		    }
			
			//venueArr =new Array();venueArr.length = 0;
			
			var venueArr =new Array(data.length - 1);
			for (var j = data.length - 1; j >= 0; j--) { // Array, from venue location in data and distance for sorting
			var venueSort = [j,data[j].distance];
			venueArr.push(venueSort);
			}
			venueArr.sort(function(a,b) { //Sorts order of the venues by distance
		    return a[1] - b[1];
		    }); 
            return venueArr;			
			
		} //Distance and sorting out

function bustCheck(bustId){
        
		var venue4 = JSON.parse(localStorage.getItem('bustId'));  var venue3 = venue4.split("b");	var venue2 = venue3[0];
		var venue = parseInt(venue2);   
		var authorization=localStorage.authorization;
        var endpoint = "http://vm0063.virtues.fi/venues/"+venue+"/";
        $.ajax({
          type: "GET",
          url: endpoint,
		  async: true, 
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authorization);
          }
        }).done(function( data ) {   	
			   var tagger = parseInt(data.gangsterSpraying);

			   if (tagger == 0 || tagger == localStorage.gangster){   //check the gangsters not bustin themselves, they are on same location
			   mixpanel.track("BustCheck", {"BustFailure":"BustFailure"}); 
			   $("#modal-bust-error").addClass("md-show");
              //animation
        
               $('.error .md-content button').addClass('animated fadeIn');
               $('.md-close').one( "click", function() {
               window.location = "index.html";
               });
			   
			   }else{
			    mixpanel.track("BustCheck", {"BustSuccess":"BustSuccess"});
			 	$("#modal-bust-success").addClass("md-show"); //Modal for successful bust
              //animation
               
               $('.error .md-content button').addClass('animated fadeIn');
               $('.md-close').one( "click", function() {
               window.location = "index.html";
               });
			   
			   var gangster = localStorage.gangster;
			 
               localStorage.points  = Number(localStorage.points) + 10;
               localStorage.busts = Number(localStorage.busts) + 1;
			   var endpoint3 = "http://vm0063.virtues.fi/gangsters/"+gangster+"/";
               var data =  {
                      points: localStorage.points,
                      busts: localStorage.busts
                  }
			   $.ajax({
               type: "PATCH",
               url: endpoint3,
		       async: true, 
               dataType: 'json',
			   data: data,
               beforeSend: function (xhr) {
               xhr.setRequestHeader ("Authorization", authorization);
                 }
               }).done(function( data ) {
			    
			        var endpoint2 = "http://vm0063.virtues.fi/gangsters/"+tagger+"/";
                    var data =  {        //Taggers change in busted... Points and busted counts are done from taggers end
                      bustedviapolice: 1
                    }
			        $.ajax({
                    type: "PATCH",
                    url: endpoint2,
		            async: true, 
                    dataType: 'json',
					data: data,
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", authorization);
                    }
                    }).done(function( data ) {
                    }).fail(function( jqXHR, textStatus ) {
                    alert("First Error: something went wrong while updating the location: "+ textStatus);
                    });
					}).fail(function( jqXHR, textStatus ) {
                    //TODO fix these and place redirect to index and clean venue id from local storage
                    alert("First Error: something went wrong while updating the location: "+ textStatus);
                    });
					
			         } 
               
			   }).fail(function( jqXHR, textStatus ) {
              //TODO fix these and place redirect to index and clean venue id from local storage
                alert("First Error: something went wrong while updating the location: "+ textStatus);
              });
			  
			   }
			   
             
/*fuction refreshDistances(){

}*/		
	 
}
				
window.alert = function(){return null;}; //Javascript popups disabled, atleast for now
});
