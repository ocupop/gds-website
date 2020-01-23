// Project JS
$(document).ready(function () {

  //instatiate scrollmagic controllers
  var controllerAnimations = new ScrollMagic.Controller();
  var controllerParallax = new ScrollMagic.Controller();
  var controllerLazyLoad = new ScrollMagic.Controller();

  //disable parallax effect on small screens
  if ($(window).width() <= 992) {
    controllerParallax.enabled(false)
  }

  // parallax behavior
  $(".parallax-section").each(function () {
    var currentAnimation = this;
    var tween = new TimelineMax()
      .add([
        TweenMax.fromTo(".parallax-section .layer1", 1, { y: 0 }, { y: 100, ease: Linear.easeNone }),
        TweenMax.fromTo(".parallax-section .layer2", 1, { y: 0 }, { y: 200, ease: Linear.easeNone }),
        TweenMax.fromTo(".parallax-section .layer3", 1, { y: 0 }, { y: 100, ease: Linear.easeNone }),
        TweenMax.fromTo(".parallax-section .layer4", 1, { y: 0 }, { y: 200, ease: Linear.easeNone })
      ]);
    // build scene
    var scene = new ScrollMagic.Scene({
      triggerElement: currentAnimation,
      duration: $(window).height()
    })
      .setTween(tween)
      .addTo(controllerParallax);
  })

  $(".animate").each(function () {
    var currentAnimation = this;
    var scene = new ScrollMagic.Scene({
      triggerElement: currentAnimation,
      offset: -475,
      reverse: false
    })
      .setClassToggle(currentAnimation, "active")
      .addTo(controllerAnimations);
  });

  //show hover menu background on hover
  $('.hover-trigger').hover(function (e) {
    $('#page-header').toggleClass('hover-active')
  });

  //scroll animation on homepage
  if ($('.homepage').length) {
    $('.hover-trigger > a').on('click', function (e) {
      e.preventDefault();
      var el = $(this).attr('href');
      var targ = el.replace("/", "");
      $("html, body").animate({
        scrollTop: $($(targ)).offset().top - 75
      }, 1000);
    })
  }

  // lazy loading
  $('[data-lazy-type]').each(function () {
    var currentElement = this;
    var $this = $(this);
    var type = $this.data('lazy-type');
    var lazySrc = $this.data('lazy-src');
    var scene = new ScrollMagic.Scene({
      triggerElement: currentElement,
      reverse: false,
      offset: -750
    })
      .on('enter', function () {
        if (type == 'image') {
          // console.log('run image function, this is an image lazy load');
          $this.attr('src', lazySrc);
        }
        if (type == 'bg-image') {
          // console.log('run bg image function, this is a bg-image lazy load');
          $this.css('background-image', 'url(' + lazySrc + ')')
        }
        if (type == 'video') {
          // console.log('run video function, this is a video lazy load');
          $this.attr('src', lazySrc);
        }
      })
      .setClassToggle(currentElement, "lazy-loaded")
      .addTo(controllerLazyLoad);
  })
});