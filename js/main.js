/* =========================================================
   École Emmanuel — Interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Image de remplacement automatique ----
     Tant qu'une vraie photo n'est pas déposée, on affiche un visuel
     de remplacement propre (sable + icône). Dès que tu déposes une
     image au bon nom de fichier, elle s'affiche à la place. */
  function placeholder(label) {
    var txt = (label || "Photo à venir").replace(/[<&>]/g, "");
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
      '<rect width="800" height="600" fill="#f0e9dc"/>' +
      '<g fill="none" stroke="#e07a3f" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="320" y="232" width="160" height="120" rx="14"/>' +
      '<circle cx="400" cy="292" r="34"/>' +
      '<path d="M350 232l16-26h68l16 26"/></g>' +
      '<text x="400" y="430" font-family="Nunito Sans, sans-serif" font-size="28" fill="#5c574f" ' +
      'text-anchor="middle">' + txt + '</text></svg>';
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function handle() {
      img.removeEventListener("error", handle);
      img.src = placeholder(img.alt);
    });
    // Déclenche le contrôle même pour les images déjà en cache/erreur
    if (img.complete && img.naturalWidth === 0) {
      img.src = placeholder(img.alt);
    }
  });

  /* ---- Année courante dans le pied de page ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Referme le menu quand on clique sur un lien
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Ombre sur l'en-tête au défilement ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Apparition des éléments au défilement ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Repli : tout afficher si IntersectionObserver indisponible
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- Barre de progression de lecture (page Histoire) ---- */
  var progress = document.getElementById("readProgress");
  if (progress) {
    var updateProgress = function () {
      var h = document.documentElement;
      var scrollable = h.scrollHeight - h.clientHeight;
      var pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      progress.style.width = pct + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* ---- Carrousel galerie (regroupe les photos par pages de 6) ---- */
  var carousel = document.getElementById("galleryCarousel");
  if (carousel) {
    var viewport = carousel.querySelector(".gallery-viewport");
    var track = carousel.querySelector(".gallery-track");
    var prevBtn = carousel.querySelector(".carousel-prev");
    var nextBtn = carousel.querySelector(".carousel-next");
    var dotsWrap = carousel.querySelector(".carousel-dots");
    var PER_PAGE = 6;

    var items = Array.prototype.slice.call(track.querySelectorAll(".gallery-item"));
    var pageCount = Math.ceil(items.length / PER_PAGE);

    // (Re)construit le ruban en tranches de 6 photos
    track.innerHTML = "";
    for (var p = 0; p < pageCount; p++) {
      var slide = document.createElement("div");
      slide.className = "gallery-slide";
      for (var i = p * PER_PAGE; i < Math.min((p + 1) * PER_PAGE, items.length); i++) {
        slide.appendChild(items[i]);
      }
      track.appendChild(slide);
    }

    if (pageCount <= 1) {
      // Une seule page : pas de flèches ni de points
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
    } else {
      var current = 0;

      var clamp = function (n) { return Math.max(0, Math.min(n, pageCount - 1)); };
      var update = function () {
        var dots = dotsWrap.children;
        for (var d = 0; d < dots.length; d++) {
          dots[d].classList.toggle("active", d === current);
        }
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === pageCount - 1;
      };
      var goTo = function (n) {
        current = clamp(n);
        viewport.scrollTo({ left: current * viewport.clientWidth, behavior: "smooth" });
        update();
      };

      // Points de navigation
      for (var q = 0; q < pageCount; q++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Aller à la page " + (q + 1) + " sur " + pageCount);
        (function (idx) { dot.addEventListener("click", function () { goTo(idx); }); })(q);
        dotsWrap.appendChild(dot);
      }

      if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1); });
      if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1); });

      // Synchronise les points quand on fait défiler au doigt (swipe)
      var scrollTimer;
      viewport.addEventListener("scroll", function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          current = clamp(Math.round(viewport.scrollLeft / viewport.clientWidth));
          update();
        }, 90);
      }, { passive: true });

      // Garde la bonne page alignée si la fenêtre change de taille
      window.addEventListener("resize", function () {
        viewport.scrollLeft = current * viewport.clientWidth;
      });

      update();
    }
  }

  /* ---- Lightbox galerie photos ---- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  if (lightbox && lightboxImg) {
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        var src = item.getAttribute("href");
        var img = item.querySelector("img");
        lightboxImg.src = src;
        lightboxImg.alt = img ? img.alt : "";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });
    var closeLightbox = function () {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
    };
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ---- Lecture des vidéos YouTube au clic (chargées seulement au besoin) ---- */
  document.querySelectorAll(".video-frame").forEach(function (frame) {
    frame.addEventListener("click", function () {
      var id = frame.getAttribute("data-embed");
      if (!id || id.indexOf("VIDEO_ID") === 0) {
        alert("Ajoute l'identifiant de la vidéo YouTube dans l'attribut data-embed de cette vidéo.");
        return;
      }
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.title = "Vidéo École Emmanuel";
      frame.innerHTML = "";
      frame.appendChild(iframe);
    });
  });

})();
