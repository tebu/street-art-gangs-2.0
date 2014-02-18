$(document).ready(function(){
    mixpanel.track("PageLaunch", {page:"signup"});
    

    $('h1').addClass('animated pulse');
    $('input, select').addClass('animated slideInLeft');
    $('.btn').addClass('animated bounceInUp');
    $('#trigger-overlay').addClass('animated slideInRight');
    
    //Change background depending on the gang
    $( "#gang" ).change(function () {
        var gang = $( "#gang option:selected" ).attr('id');
        switch (gang) {
            case 'purple':
                $('#signup').removeClass().addClass('purple')
                break;
            case 'greens':
                $('#signup').removeClass().addClass('green')
                break;
            case 'blues':
                $('#signup').removeClass().addClass('blue')
                break;
            default:
                $('#signup').removeClass().addClass('neutral')
        }
    }).change();

    //Form submission
    $('.btn.btntxt').one( "click", function() {
        //TODO: Validate.
        //TODO Check same password

        var endpoint = "http://vm0063.virtues.fi/authentication/";

        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var rePassword = $('#rePassword').val();
        var gang = $( "#gang option:selected" ).data( "gang" );

        var attr = {
            username: username,
            email: email,
            password: password,
            gang: gang
        };

        $.post( endpoint, attr).done(function( data ) {
                var authorization = make_base_auth(username, password);
                localStorage.authorization=authorization;
                localStorage.color=data['color'];
                localStorage.gangster=data['id'];
                localStorage.gang=data['gang'];
                window.location.replace("index.html");
            }).fail(function( jqXHR, textStatus ) {
            //TODO fix this
                //alert("Error");
				window.location.replace("signup.html");
            });

});

});



// Paula, kokeile jos saisit tän animoidun taustan pois, kun käyttäjä valitsee gangin. 


//animated gradient bg
var colors = new Array(
  [48, 255, 137],
  [0, 191, 255],
  [172, 48, 255],
  [118, 28, 255]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

 $('body').css({
 background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
 background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});


  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,1);
