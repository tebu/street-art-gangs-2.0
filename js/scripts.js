// Fittext.js
jQuery(document).ready(function(){
  jQuery("h1.location").fitText(1);
  jQuery("h3.title").fitText(2);
  jQuery(".icon-record").fitText(1, { minFontSize: '50px', maxFontSize: '60px' });
  jQuery(".category").fitText(1, { minFontSize: '80px', maxFontSize: '120px' });
  jQuery("a.arrow").fitText(1, { minFontSize: '60px', maxFontSize: '100px' });
  jQuery(".spray").fitText(1, { minFontSize: '60px', maxFontSize: '100px' });
});

// animate.css
// jQuery(document).ready(function(){
//        jQuery('.spray').addClass('animated shake');
//    });

// $(document).ready( function () {
  
//   alert("Hello, world")
  
// }); 