//Function counts length of input text. Reduces counter and changes color accordingly

$(document).ready(function() {
  $("#tweet-text").on('input', function() {
   let textSize = $(this).val().length;
   let maxNum = 140;
  $(".counter").val(maxNum - textSize); 
   if (textSize > maxNum) {
    $(".counter").css({'color': 'red'})
   } else {
    $(".counter").css({'color': 'black'})
   }
  });
});

