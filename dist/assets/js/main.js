(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
console.log("Main JS loaded");
document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelector(".main-visual .swiper")) {
    new Swiper(".main-visual .swiper", {
      loop: true,
      pagination: {
        el: ".main-visual-pagination .swiper-pagination",
        clickable: true
      },
      navigation: false
    });
  }
  const hamburgerMenus = document.querySelectorAll(".header-hamburger .hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;
  let overlay = document.querySelector(".mobile-nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-nav-overlay";
    document.body.appendChild(overlay);
  }
  hamburgerMenus.forEach(function(hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function() {
      const isActive = mobileNav.classList.contains("active");
      if (mobileNav) {
        if (!isActive) {
          mobileNav.classList.add("active");
          overlay.classList.add("active");
          body.style.overflow = "hidden";
        } else {
          mobileNav.classList.remove("active");
          overlay.classList.remove("active");
          body.style.overflow = "";
        }
      }
    });
  });
  overlay.addEventListener("click", function() {
    if (mobileNav) {
      mobileNav.classList.remove("active");
    }
    overlay.classList.remove("active");
    body.style.overflow = "";
  });
  const mobileNavLinks = document.querySelectorAll(".mobile-gnb a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function() {
      if (mobileNav) {
        mobileNav.classList.remove("active");
      }
      if (overlay) {
        overlay.classList.remove("active");
      }
      body.style.overflow = "";
    });
  });
  const header = document.querySelector(".header");
  const scrollThreshold = 40;
  if (header) {
    window.addEventListener("scroll", function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > scrollThreshold) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, false);
  }
});
