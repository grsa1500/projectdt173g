var bars = document.getElementById("closed");
var exit = document.getElementById("opened");

 exit.style.display = 'none';


 // Changing background of menu when scrolling
$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > 1000);
    });
  });


 // Opening/Closing menu on click 
  function openMenu() {
  
    var x = document.getElementById("allLinks");

    // checking if it's opened or closed
    if (x.style.display === "flex") {
      x.style.display = "none";
      exit.style.display = 'none';
      bars.style.display = 'block';
    } else {
      x.style.display = "flex";
      exit.style.display = 'block';
      bars.style.display = 'none';
    }
  }

  $(function () {
    $(document).scroll(function () {
      var $nav = $(".mobilenavbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > 600);
    });
  });

