window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    var options = {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 12000,
      pauseOnHover: true,
      pauseOnFocus: true,
      resetProgress: false,
      navigation: true,
    }

    var carousels = bulmaCarousel.attach('.carousel', options);

    for(var i = 0; i < carousels.length; i++) {
      carousels[i].on('before:show', state => {
        console.log(state);
      });

      carousels[i].on('after:show', function() {
        setTimeout(function() {
          if (!carousels[i].isPaused()) {
            carousels[i].start();
          }
        }, 100);
      });
    }

    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
      element.bulmaCarousel.on('before-show', function(state) {
        console.log(state);
      });
    }

    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();
});

document.addEventListener('DOMContentLoaded', function() {
  const taskSelector = document.getElementById('task-selector');
  const taskImages = document.querySelectorAll('.task-image');
  
  taskSelector.addEventListener('change', function() {
    taskImages.forEach(image => {
      image.style.display = 'none';
    });
    
    const selectedImage = document.getElementById(taskSelector.value);
    if (selectedImage) {
      selectedImage.style.display = 'block';
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const selector = document.getElementById('trajectory-selector');
  const iframe = document.getElementById('trajectory-iframe');

  if (selector && iframe) {
    const taskPaths = {
      'coordinated_lift_ball': './static/html/coordinated_lift_ball.html',
      'coordinated_lift_tray': './static/html/coordinated_lift_tray.html',
      'coordinated_push_box': './static/html/coordinated_push_block.html',
    };

    selector.addEventListener('change', function() {
      const selectedValue = selector.value;
      const path = taskPaths[selectedValue];
      
      if (path) {
        iframe.src = path + '?t=' + new Date().getTime(); // Avoid cache
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const baselineSelector = document.getElementById('baseline-selector');
  if (baselineSelector) {
    baselineSelector.addEventListener('change', function() {
      document.querySelectorAll('.baseline-comparison').forEach(function(el) {
        el.style.display = 'none';
      });
      
      const selectedId = this.value;
      document.getElementById(selectedId).style.display = 'block';
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const failureSelector = document.getElementById('failure-selector');
  if (failureSelector) {
    failureSelector.addEventListener('change', function() {
      document.querySelectorAll('.failure-class').forEach(function(el) {
        el.style.display = 'none';
      });

      const selectedId = this.value;
      document.getElementById(selectedId).style.display = 'block';
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const PLAY_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
  const PAUSE_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

  const clickableVideos = document.querySelectorAll('.rollout-videos video, .failure-videos video');
  clickableVideos.forEach(function(video) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';
    video.parentNode.insertBefore(wrapper, video);
    wrapper.appendChild(video);

    const btn = document.createElement('button');
    btn.className = 'video-toggle';
    btn.type = 'button';
    btn.innerHTML = PAUSE_SVG;
    btn.setAttribute('aria-label', 'Pause video');
    wrapper.appendChild(btn);

    function syncIcon() {
      if (video.paused) {
        btn.innerHTML = PLAY_SVG;
        btn.setAttribute('aria-label', 'Play video');
      } else {
        btn.innerHTML = PAUSE_SVG;
        btn.setAttribute('aria-label', 'Pause video');
      }
    }

    function toggle() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle();
    });
    video.addEventListener('click', toggle);
    video.addEventListener('play', syncIcon);
    video.addEventListener('pause', syncIcon);
    syncIcon();
  });

  const lazyVideos = document.querySelectorAll('video[data-lazy-autoplay]');
  if ('IntersectionObserver' in window && lazyVideos.length) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (video.preload !== 'auto') video.preload = 'auto';
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(function() { /* autoplay blocked — ignore */ });
          }
        } else {
          video.pause();
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.1 });

    lazyVideos.forEach(function(video) {
      observer.observe(video);
    });
  } else {
    lazyVideos.forEach(function(video) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function() {});
      }
    });
  }
});