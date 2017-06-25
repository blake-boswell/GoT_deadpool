$(document).ready(function(){
  console.log("Hello World");
  $(".select-btn").click(function() {
    var parent = $(this).parents(".jumbotron");
    var oldColor = parent.css("background-color");

    if(parent.data("active") === undefined) {
      console.log("First timer");
      //swap old for new
      parent.data("active", oldColor);
      parent.css("background-color", "red");
    }
    else {
      //store old data
      var newColor = parent.data("active");
      //set data to current color, and use the stored old data
      parent.data("active", oldColor);
      parent.css("background-color", newColor);
    }
  });
});
