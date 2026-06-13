// Max Performance — interactions
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Rolling hero
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1 && !reduce) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 6000);
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Review page star rating -> Google
  var stars = document.getElementById('revStars');
  if (stars) {
    var GOOGLE = stars.getAttribute('data-google') || '#';
    var spans = stars.querySelectorAll('span');
    spans.forEach(function (s, idx) {
      s.addEventListener('mouseenter', function () {
        spans.forEach(function (x, j) { x.classList.toggle('lit', j <= idx); });
      });
      s.addEventListener('click', function () {
        var rating = idx + 1;
        if (rating >= 4) {
          window.location.href = GOOGLE;
        } else {
          window.location.href = 'private.html';
        }
      });
    });
    stars.addEventListener('mouseleave', function () {
      spans.forEach(function (x) { x.classList.remove('lit'); });
    });
  }
})();
