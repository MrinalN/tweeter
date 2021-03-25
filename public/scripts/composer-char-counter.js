$(document).ready(function() {
  $("#tweet-text").on('input', function() {
   let textSize = $(this).val().length;
  $(".counter").val(140 - textSize); 

  
  });
});

//counter
