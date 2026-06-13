// Max Performance — interactions
(function () {
  // Year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Hero rolling images — lazy-load all but the first
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  if (!slides.length) return;

  function setBg(el, eager) {
    var url = el.getAttribute('data-bg');
    if (!url || el.style.backgroundImage) return;
    if (eager) {
      el.style.backgroundImage = 'url("' + url + '")';
    } else {
      var img = new Image();
      img.onload = function () { el.style.backgroundImage = 'url("' + url + '")'; };
      img.src = url;
    }
  }

  // First slide loads immediately (high priority)
  setBg(slides[0], true);

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || slides.length < 2) return;

  // Preload the rest after first paint
  window.requestAnimationFrame(function () {
    setTimeout(function () { slides.slice(1).forEach(function (s) { setBg(s, false); }); }, 600);
  });

  var i = 0;
  setInterval(function () {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    setBg(slides[i], false);
    slides[i].classList.add('is-active');
  }, 6000);
})();
