(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;

    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /* ================= NAV ACTIVE FIX ================= */

  const navbarlinks = select("#navbar .scrollto", true);

  const navbarlinksActive = () => {
    const position = window.scrollY + 200;

    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;

      const section = select(navbarlink.hash);
      if (!section) return;

      if (
        position >= section.offsetTop &&
        position < section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /* ================= SMOOTH SCROLL ================= */

  const scrollto = (el) => {
    const element = select(el);
    if (!element) return;

    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth"
    });
  };

  on("click", ".scrollto", function(e) {
    const target = select(this.hash);
    if (!target) return;

    e.preventDefault();

    const body = select("body");
    if (body.classList.contains("mobile-nav-active")) {
      body.classList.remove("mobile-nav-active");
      const navbarToggle = select(".mobile-nav-toggle");
      navbarToggle.classList.toggle("bi-list");
      navbarToggle.classList.toggle("bi-x");
    }

    scrollto(this.hash);
  }, true);

  window.addEventListener("load", () => {
    if (window.location.hash) {
      scrollto(window.location.hash);
    }
  });

  /* ================= MOBILE NAV ================= */

  on("click", ".mobile-nav-toggle", function() {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /* ================= BACK TO TOP ================= */

  const backtotop = select(".back-to-top");

  if (backtotop) {
    const toggleBacktotop = () => {
      window.scrollY > 100
        ? backtotop.classList.add("active")
        : backtotop.classList.remove("active");
    };

    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /* ================= TYPED HERO ================= */

  const typed = select(".typed");

  if (typed) {
    const typed_strings = typed
      .getAttribute("data-typed-items")
      .split(",");

    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /* ================= SKILLS ANIMATION ================= */

  const skilsContent = select(".skills-content");

  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function() {
        const progress = select(".progress .progress-bar", true);
        progress.forEach(el => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      }
    });
  }

  /* ================= PORTFOLIO ================= */

  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container");

    if (!portfolioContainer) return;

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item"
    });

    const portfolioFilters = select("#portfolio-flters li", true);

    on("click", "#portfolio-flters li", function(e) {
      e.preventDefault();

      portfolioFilters.forEach(el =>
        el.classList.remove("filter-active")
      );

      this.classList.add("filter-active");

      portfolioIsotope.arrange({
        filter: this.getAttribute("data-filter")
      });
    }, true);
  });

  /* ================= LIGHTBOX ================= */

  GLightbox({
    selector: ".portfolio-lightbox"
  });

  /* ================= PORTFOLIO SLIDER ================= */

  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    }
  });

  /* ================= AOS ================= */

  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})();
