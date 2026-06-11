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
