jQuery(document).ready(function(){

      if (!localStorage.authorization||!localStorage.color||!localStorage.gangster||!localStorage.gang) {
        window.location.replace("splash.html");
      } else {

        //Change color background depending on player's color
        var color = localStorage.color;
        $('body').removeClass().addClass(color)      // GNMmenu.js
        new gnMenu( document.getElementById( 'gn-menu' ) );

        //Retrieve messages - TODO filter by gang
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
          /*
                <div class="message-element others">
                <div class="bubble">
                  <span class="chatter_msg_item chatter_msg_item_user"><span class="new"></span>
                  <span class="timestamp">1 min ago</span>Lorem ipsum dolor sit amet, eum an stet invidunt voluptatibus</span>
                </div>
                <div class="sender">
                  <a href="" class="chatter_avatar">J0k3er</a>
                </div>
              </div><!-- /message-element -->
          */
          for (var i = 0; i < data.length; i++) {
              var messageDiv = $("<div>").addClass("message-element");
              var bubleDiv = $("<div>").addClass("bubble");
              var itemSpan =$("<span>").addClass("chatter_msg_item").addClass("chatter_msg_item_user");
              $("<span>").addClass("new").appendTo(itemSpan);
              $("<span>").addClass("timestamp").text(moment(data[i].timestamp).fromNow()).appendTo(itemSpan); //TODO put moment
              itemSpan.append(data[i].text).appendTo(bubleDiv); //TODO put message
              bubleDiv.appendTo(messageDiv);

              var senderDiv = $("<div>").addClass("sender");
              var sender = "";
              if (data[i].gangster == gangster)
                sender = "You";
              else
                sender = "Team Mate";

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
});
