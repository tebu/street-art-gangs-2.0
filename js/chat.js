jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {
	    var color = localStorage.color;
		var gangster = localStorage.gangster;
		
		
		mixpanel.track("PageLaunch", {page:"chat", gang: color, gangster: gangster});
        //Change color background depending on player's color
        
        $('body').removeClass().addClass(color)      // GNMmenu.js
        new gnMenu( document.getElementById( 'gn-menu' ) );

        retrieveMSG();


        $('#send-msg').one( "click", function() {
            var authorization=localStorage.authorization;
            var gangster = localStorage.gangster;
            var endpoint = "http://vm0063.virtues.fi/messages/";
            var now = moment().format();
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
	
	
	var senderList = retreiveSenders(data,authorization); // List of gangster ID corresponding names
	
    for (var i = 0; i < data.length; i++) {
        var messageDiv = $("<div>").addClass("message-element");
        var bubleDiv = $("<div>").addClass("bubble");
        var itemSpan =$("<span>").addClass("chatter_msg_item").addClass("chatter_msg_item_user");

        $("<span>").addClass("timestamp").text(moment(data[i].timestamp).fromNow()).appendTo(itemSpan); //TODO put moment
        itemSpan.append(data[i].text).appendTo(bubleDiv); //TODO put message
        bubleDiv.appendTo(messageDiv);

        var senderDiv = $("<div>").addClass("sender");
        var sender = "";
		
		
        if (data[i].gangster == gangster){
          sender = "You";
        }else{
		  for (var j = senderList.length - 1; j >= 0; j--) if (data[i].gangster == senderList[j][0]){sender = senderList[j][1];}}
		 
        $("<a>").attr("href", "").addClass("chatter_avatar").text(sender).appendTo(senderDiv);//TODO put sender name
        senderDiv.appendTo(messageDiv);

        if (data[i].gangster == gangster)
          messageDiv.addClass("myself");
        else
          messageDiv.addClass("others");

        $(".chatter").append(messageDiv);
    };


    jQuery('.chatter_msg_item').addClass('animated pulse');
    jQuery('.new').addClass('animated flash');

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
			
			for (var i = msgData.length - 1; i >= 0; i--) { //6x
			id=msgData[i].gangster;
			   for (var j = data.length - 1; j >= 0; j--) //3x
				{if (id == data[j].id){ //
				gangsterName=data[j].username;
				var list = [id,gangsterName]
				gangList.push(list);
				} else {
				continue;
				}}
				}
				}
				);
				return gangList;
				}
			   
			
		
		

