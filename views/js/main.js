/*
	Project Name :
	Author Company : cftcooperations
	Project Date: 25 Mar, 2018
	Template Developer: vsafaryan50@gmail.com
==============================================
TABLE OF CONTENT
==============================================

1. Header
2. Swiper Slider
3. Preloader
4. Carousels
5. Player
6. Tabs

==============================================
[END] TABLE OF CONTENT
==============================================
*/
"use strict";
/*-----------------------------------------
1. Header
-------------------------------------------*/
/*---------------------
  Fixed Nav
-----------------------*/
$('#navigation1').navigation();
$('#navigation1').fixed();

/*---------------------
Transparent Nav Options
-----------------------*/
if ($("#nav-transparent").length !== 0) {
  if ($(window).width() > 991) {
    $("#nav-transparent #main_logo").css("display", "none");
  } else {
    $("#nav-transparent #light_logo").css("display", "none");
  }
  $(window).scroll(function () {
    const scroll = $(window).scrollTop();
    if ($(window).width() > 991) {
      if (scroll > 30) {
        $(".navigation-fixed-wrapper").addClass("nav-white-bg");
        $("#nav-transparent #main_logo").css("display", "inline-block");
        $("#nav-transparent #light_logo").css("display", "none");
      } else {
        $(".navigation-fixed-wrapper").removeClass("nav-white-bg");
        $("#nav-transparent #light_logo").css("display", "inline-block");
        $("#nav-transparent #main_logo").css("display", "none");
      }
    }
  })
}

/*---------------------
Nav Slide Effect
-----------------------*/
$("#navigation2").navigation({
  effect: "slide"
});

/*---------------------
Nav Zoom Effect
-----------------------*/
$("#navigation3").navigation({
  animationOnShow: "zoom-in",
  animationOnHide: "zoom-out"
});

/*---------------------
Overlay Nav
-----------------------*/
$("#navigation4").navigation({
  overlayColor: "rgba(0,0,0,0.6)"
});

/*---------------------
Affix Nav
-----------------------*/
$("#navigation4").fixed({
  offset: 20
});

/*---------------------
Hidden Nav
-----------------------*/
$("#navigation5").navigation({
  hidden: true
});

if ($("#navigation-push").length !== 0) {
  if ($(window).width() > 991) {
    $("#navigation-push").find($(".nav-menus-wrapper").addClass("nav-menus-wrapper-open"));
    $("#navigation-push").find($(".nav-menus-wrapper-close-button").hide());
    $("#navigation-push").find($(".small-size-header").hide());
  } else {
    $("#navigation5 #main_logo").clone().appendTo(".small-size-header-logo");
    $("#main_logo").css("display", "none");
    $("#navigation-push").find($(".nav-menus-wrapper").removeClass("nav-menus-wrapper-open"));
  }
}

/*---------------------
Button Nav
-----------------------*/
$(".btn-show").on('click', function () {
  $("#navigation5").data("navigation").toggleOffcanvas();
});

$("#navigation6").navigation({
  offCanvasSide: "right"
});

/*---------------------
Simple Nav
-----------------------*/
$("#navigation7").navigation();

/*-----------------------------------------
2. Swiper Slider
-------------------------------------------*/
/*---------------------
  Main Slider
-----------------------*/
if ($(".swiper-main-slider").length !== 0) {
  //Slider Animated Caption
  const swiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0,
    loop: true,
    simulateTouch: true,
    autoplay: 5000,
    speed: 1000,
    onSlideChangeEnd: function (swiper) {
      $('.swiper-slide').each(function () {
        if ($(this).index() === swiper.activeIndex) {
          // Fadein in active slide
          $(this).find('.slider-content').fadeIn(300);
        } else {
          // Fadeout in inactive slides
          $(this).find('.slider-content').fadeOut(300);
        }
      });
    }
  });
}

/*---------------------
Main Slider Fade Effect
-----------------------*/
if ($(".swiper-main-slider-fade").length !== 0) {
  //Slider Animated Caption
  const swiper = new Swiper('.swiper-container', {
    effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0,
    loop: true,
    simulateTouch: true,
    autoplay: 5000,
    speed: 1000,
    onSlideChangeEnd: function (swiper) {
      $('.swiper-slide').each(function () {
        if ($(this).index() === swiper.activeIndex) {
          // Fadein in active slide
          $(this).find('.slider-content').fadeIn(300);
        } else {
          // Fadeout in inactive slides
          $(this).find('.slider-content').fadeOut(300);
        }
      });
    }
  });
}

/*-----------------------------------------
3. Preloader
-------------------------------------------*/
$('#preloader').fadeOut('normall', function () {
  $(this).remove();
});


/*-----------------------------------------
4. Carousels
-------------------------------------------*/
$(document).ready(function () {
  $(".owl-brands").owlCarousel({
    loop: true,
    items: 6,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 850,
    autoplayTimeout: 4000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      }
    }
  })
});

$(document).ready(function () {
  $(".owl-reviews").owlCarousel({
    loop: true,
    items: 1,
    margin: 10,
    nav: false,
    dots: true,
  })
});

if ($('#testim').length !== 0) {
  let testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 3500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer
  
  window.onload = function () {
    // Testim Script
    function playSlide(slide) {
      for (var k = 0; k < testimDots.length; k++) {
        testimContent[k].classList.remove("active");
        testimContent[k].classList.remove("inactive");
        testimDots[k].classList.remove("active");
      }
      
      if (slide < 0) {
        slide = currentSlide = testimContent.length - 1;
      }
      
      if (slide > testimContent.length - 1) {
        slide = currentSlide = 0;
      }
      
      if (currentActive !== currentSlide) {
        testimContent[currentActive].classList.add("inactive");
      }
      testimContent[slide].classList.add("active");
      testimDots[slide].classList.add("active");
      
      currentActive = currentSlide;
      
      clearTimeout(testimTimer);
      testimTimer = setTimeout(function () {
        playSlide(currentSlide += 1);
      }, testimSpeed)
    }
    
    testimLeftArrow.addEventListener("click", function () {
      playSlide(currentSlide -= 1);
    })
    
    testimRightArrow.addEventListener("click", function () {
      playSlide(currentSlide += 1);
    })
    
    for (var l = 0; l < testimDots.length; l++) {
      testimDots[l].addEventListener("click", function () {
        playSlide(currentSlide = testimDots.indexOf(this));
      })
    }
    
    playSlide(currentSlide);
  }
}

/*-----------------------------------------
5. Player
-------------------------------------------*/
if (document.getElementById('video') !== null) {
  const templateElement = document.getElementById('video');
  const template = templateElement.innerHTML;
  const posterElement = document.getElementById('video-poster');
  const videoElement = document.getElementById('video-element');
  posterElement.addEventListener('click', function () {
    videoElement.removeChild(posterElement);
    videoElement.innerHTML += template;
  });
}

if (document.getElementById('player') !== null) {
  const doom = document.getElementById('player');
  const templateElement = document.getElementById('video-2');
  const template = templateElement.innerHTML;
  const posterElement = document.getElementById('video-poster-2');
  const videoElement = document.getElementById('video-element-2');
  posterElement.addEventListener('click', function () {
    videoElement.removeChild(posterElement);
    doom.style.padding = 0;
    doom.style.height = "400px";
    videoElement.style.height = "400px";
    videoElement.innerHTML += template;
  });
}


$('.collapse').collapse();
$('.dropdown-toggle').dropdown();


/*------------------------------------
6. Tabs
--------------------------------------*/
if ($('.tabs_animate').length !== 0) {
  $('.tabs_animate').tabslet({
    mouseevent: 'click',
    attribute: 'href',
    animation: true
  });
}
