jQuery(document).ready(function(){

 



      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		watchGPS();
		mixpanel.register({gang: color, gangster: gangster, latitude: localStorage.latitude, longitude: localStorage.longitude});
		mixpanel.track("PageLaunch", {page:"chat"});
        //Change color background depending on player's color
        
        $('body').removeClass().addClass(color)      // GNMmenu.js
        new gnMenu( document.getElementById( 'gn-menu' ) );

        retrieveMSG();
		

        $('#send-msg').on( "click", function() {
            var authorization=localStorage.authorization;
            var gangster = localStorage.gangster;
            var endpoint = "http://vm0063.virtues.fi/messages/";
            var now = moment().format();
			var msgContent = $(".chatter_field").val();
			mixpanel.track("Chat", {Message: msgContent, Time: now, gang: color, gangster: gangster});
			
            var data =  {
                gangster: gangster,
                timestamp: now,
                text: $(".chatter_field").val()
            }
           $.ajax({
              type: "POST",
              url: endpoint,
              dataType: 'json',
              data: data,
              beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", authorization);
              }
          }).done(function( data ) {
                mood: $('.chatter_field').val("");
                retrieveMSG();
          }).fail(function( jqXHR, textStatus ) {
            //TODO fix this
            alert("Error: something went wrong while updating the location: "+ textStatus);
          });

        });
      }
});


var retrieveMSG = function() {
  var authorization=localStorage.authorization;
  var gangster = localStorage.gangster;
  var gang = localStorage.gang;
  var endpoint = "http://vm0063.virtues.fi/messages/?limit=10&gang="+gang;
  $.ajax({
    type: "GET",
    url: endpoint,
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", authorization);
    }
  }).done(function( data ) {
    $(".chatter").empty();
	
	
	var senderList = retreiveSenders(data,authorization); // Array of gangster ID corresponding names
	
    for (var i = 0; i < data.length; i++) {
        var messageDiv = $("<div>").addClass("message-element");
        var bubleDiv = $("<div>").addClass("bubble");
        var itemSpan =$("<span>").addClass("chatter_msg_item").addClass("chatter_msg_item_user");


        var senderDiv = $("<div>").addClass("sender");
        var sender = "";
		
		
        if (data[i].gangster == gangster){
          sender = "You";
        }else{
		  for (var j = senderList.length - 1; j >= 0; j--) if (data[i].gangster == senderList[j][0]){sender = senderList[j][1];}} 
		 
        $("<a>").attr("href", "").addClass("chatter_avatar").text(sender).appendTo(senderDiv);
        senderDiv.appendTo(messageDiv);
        
        $("<span>").addClass("timestamp").text(moment(data[i].timestamp).fromNow()).appendTo(senderDiv); //TODO put moment
        itemSpan.append(data[i].text).appendTo(bubleDiv); //TODO put message
        bubleDiv.appendTo(messageDiv);

        if (data[i].gangster == gangster)
          messageDiv.addClass("myself");
        else
          messageDiv.addClass("others");

        $(".chatter").append(messageDiv);
    };

         $('.message-element').addClass('animated rollIn');
   

  }).fail(function( jqXHR, textStatus ) {
  //TODO fix this
    alert("Error: something went wrong while loading the profile: "+ textStatus);
  });
  }
  function retreiveSenders(msgData,authorization){	
		
		var authorization=localStorage.authorization;
		var endpoint2 = "http://vm0063.virtues.fi/gangsters/";
		var gangList =[];
		
		jQuery.ajax({
		type: "GET",
		async: false, 
		url: endpoint2,  
		dataType: 'json',
		beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", authorization);
		}
		}).done(function joku( data ){ 
			var id = 0;
			var gangsterName = "";
			var list = [];
			
			for (var i = msgData.length - 1; i >= 0; i--) { //goes through messages, there is a maximum of 10, pjew
			id=msgData[i].gangster;
			   for (var j = data.length - 1; j >= 0; j--) //goes through gangster data max of how many players there are
				{if (id == data[j].id){ 
				gangsterName=data[j].username;
				var list = [id,gangsterName];
				gangList.push(list);
				} else {
				continue;
				}}
				}
				}
				);
				return gangList;
				}
			   
			
		
		

