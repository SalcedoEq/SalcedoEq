
/*header----------------------*/
/*menu hamburguesa */
const openMobileMenu = document.querySelector(".mobile-menu-toggle");
const closeMobileMenu = document.querySelector(".close-menu-toggle");
const navMenu = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const navIntern = document.querySelectorAll(".nav a");
const closeAppear = document.querySelector(".close-menu-toggle");
const mobileMenuDisappear = document.querySelector(".mobile-menu-toggle");
const headerActive = document.querySelector("header");

function updateInerStatus() {
  if (window.innerWidth <= 768 && !navMenu.classList.contains("inert")) {
    navMenu.setAttribute("inert", "");
    openMobileMenu.setAttribute("aria-expanded", "false");
  }
  else {
    navMenu.removeAttribute("inert");
    openMobileMenu.setAttribute("aria-expanded", "true");

  }
}

updateInerStatus();
window.addEventListener("resize", updateInerStatus);

openMobileMenu.addEventListener("click", () => {
  closeMenu();
  headerActive.classList.add("active");
  navMenu.classList.add("active");
  overlay.classList.add("active");
  closeAppear.classList.add("active");
  mobileMenuDisappear.classList.add("inactive");
  navMenu.removeAttribute("inert");
  openMobileMenu.setAttribute("aria-expanded", "true");
});

function closeMenu() {
  headerActive.classList.remove("active");
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
  closeAppear.classList.remove("active");
  mobileMenuDisappear.classList.remove("inactive");
  dropdownProducto.classList.remove("active");
  dropdownPortafolio.classList.remove("active");
  dropdownRecomendado.classList.remove("active");
  dropdownConsultoria.classList.remove("active");
  navProducto.setAttribute("aria-expanded", "false");
  navProducto.classList.remove("active");
  navPortafolio.setAttribute("aria-expanded", "false");
  navPortafolio.classList.remove("active");
  navRecomendado.setAttribute("aria-expanded", "false");
  navRecomendado.classList.remove("active");
  navConsultoria.setAttribute("aria-expanded", "false");
  navConsultoria.classList.remove("active");
  closeSearch.classList.remove("active");
  searchBar.classList.remove("active");
  hideSearch.classList.remove("inactive");
  overlaySearch.classList.remove("active");
  updateInerStatus();
};

closeMobileMenu.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

navIntern.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/*desplegables----------------------*/

const navProducto = document.querySelector(".dp-productos");
const navPortafolio = document.querySelector(".dp-portafolio");
const navRecomendado = document.querySelector(".dp-recomendado");
const navConsultoria = document.querySelector(".dp-consultoria");

const dropdownProducto = document.querySelector(".dc-productos");
const dropdownPortafolio = document.querySelector(".dc-portafolio");
const dropdownRecomendado = document.querySelector(".dc-recomendado");
const dropdownConsultoria = document.querySelector(".dc-consultoria");

navProducto.addEventListener("click", () => {
  if (!navProducto.classList.contains("active")) {
    headerActive.classList.add("active");
    navMenu.classList.add("active");
    closeAppear.classList.add("active");
    mobileMenuDisappear.classList.add("inactive");
    dropdownPortafolio.classList.remove("active");
    navPortafolio.classList.remove("active");
    dropdownRecomendado.classList.remove("active");
    navRecomendado.classList.remove("active");
    dropdownConsultoria.classList.remove("active");
    navConsultoria.classList.remove("active");
    dropdownProducto.classList.add("active");
    navProducto.setAttribute("aria-expanded", "true");
    navProducto.classList.add("active");
    overlay.classList.add("active");
  }
  else {
    closeMenu();
  }
});

navPortafolio.addEventListener("click", () => {
  if (!navPortafolio.classList.contains("active")) {
    headerActive.classList.add("active");
    navMenu.classList.add("active");
    closeAppear.classList.add("active");
    mobileMenuDisappear.classList.add("inactive");
    dropdownProducto.classList.remove("active");
    navRecomendado.classList.remove("active");
    dropdownRecomendado.classList.remove("active");
    navConsultoria.classList.remove("active");
    dropdownConsultoria.classList.remove("active");
    navProducto.classList.remove("active");
    dropdownPortafolio.classList.add("active");
    navPortafolio.setAttribute("aria-expanded", "true");
    navPortafolio.classList.add("active");
    overlay.classList.add("active");
  }
  else {
    closeMenu();
  }
});

navRecomendado.addEventListener("click", () => {
  if (!navRecomendado.classList.contains("active")) {
    headerActive.classList.add("active");
    navMenu.classList.add("active");
    closeAppear.classList.add("active");
    mobileMenuDisappear.classList.add("inactive");
    dropdownProducto.classList.remove("active");
    navConsultoria.classList.remove("active");
    dropdownPortafolio.classList.remove("active");
    navProducto.classList.remove("active");
    dropdownConsultoria.classList.remove("active");
    navPortafolio.classList.remove("active");
    dropdownRecomendado.classList.add("active");
    navRecomendado.setAttribute("aria-expanded", "true");
    navRecomendado.classList.add("active");
    overlay.classList.add("active");
  }
  else {
    closeMenu();
  }
});

navConsultoria.addEventListener("click", () => {
  if (!navConsultoria.classList.contains("active")) {
    headerActive.classList.add("active");
    navMenu.classList.add("active");
    closeAppear.classList.add("active");
    mobileMenuDisappear.classList.add("inactive");
    dropdownProducto.classList.remove("active");
    navProducto.classList.remove("active");
    dropdownPortafolio.classList.remove("active");
    navPortafolio.classList.remove("active");
    dropdownRecomendado.classList.remove("active");
    navRecomendado.classList.remove("active");
    dropdownConsultoria.classList.add("active");
    navConsultoria.setAttribute("aria-expanded", "true");
    navConsultoria.classList.add("active");
    overlay.classList.add("active");
  }
  else {
    closeMenu();
  }
});

/*desplegables----------------------*/

/* scroll desplegables*/
const navDerecha = document.querySelector(".nav-der");
const navIzquierda = document.querySelector(".nav-izq");
const panelNav = document.querySelector("nav");

function isOverflowing() {

  return panelNav.scrollWidth > panelNav.clientWidth;
}


window.addEventListener("resize", () => {
  if (isOverflowing() && !navIzquierda.classList.contains("active")) {
    navDerecha.classList.add("active");
  }
  else if (!isOverflowing()) {
    navDerecha.classList.remove("active");
    navIzquierda.classList.remove("active");
  }
})

if (isOverflowing() && !navIzquierda.classList.contains("active")) {
  navDerecha.classList.add("active");
}
else if (!isOverflowing()) {
  navDerecha.classList.remove("active");
  navIzquierda.classList.remove("active");
}

navDerecha.addEventListener("click", () => {
  navIzquierda.classList.add("active");
  navDerecha.classList.remove("active");
  panelNav.scrollLeft += panelNav.scrollWidth - panelNav.clientWidth;
  document.documentElement.style.setProperty('--nav-translate', (panelNav.clientWidth - panelNav.scrollWidth).toString() + "px");
})
navIzquierda.addEventListener("click", () => {
  navDerecha.classList.add("active");
  navIzquierda.classList.remove("active");
  panelNav.scrollLeft -= panelNav.scrollWidth - panelNav.clientWidth;
  document.documentElement.style.setProperty('--nav-translate', 0);
})









/* scroll desplegables--------------*/

/*mantener header*/
let lastScroll = 0;
/*const header = document.querySelector("header")*/
window.addEventListener("scroll", () => {
  if (window.pendingSmoothScroll) {
    lastScroll = window.scrollY;
    return;
  }
  const currentScroll = window.scrollY;
  if (currentScroll <= 0) {
    headerActive.classList.add("activeScroll");
    return;
  }

  if (currentScroll > lastScroll && !headerActive.classList.contains("active")) {
    headerActive.classList.remove("activeScroll");
  }
  else {
    headerActive.classList.add("activeScroll");
  }

  lastScroll = currentScroll;
})

/*header----------------------*/


/*search----------------------------*/
const openSearch = document.querySelector(".shearch-menu");
const searchBar = document.querySelector(".search-form");
const overlaySearch = document.querySelector(".overlaySearch");
const closeSearch = document.querySelector(".close-shearch-menu");
const searchInputHeader = document.querySelector(".search-input");

if (openSearch) {
  openSearch.addEventListener("click", () => {
    closeMenu();
    closeSearch.classList.add("active");
    headerActive.classList.add("active");
    searchBar.classList.add("active");
    hideSearch.classList.add("inactive");
    overlaySearch.classList.add("active");
  });
}

if (closeSearch) {
  closeSearch.addEventListener("click", () => {
    closeMenu();
  });
}

if (overlaySearch) {
  overlaySearch.addEventListener("click", () => {
    closeMenu();
  });
}

if (searchBar) {
  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInputHeader.value.trim();
    if (query) {
      window.location.href = `/tienda.html?search=${encodeURIComponent(query)}`;
    }
  });
}

// Sync search bar with URL param if on store page
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const searchVal = params.get('search');
  if (searchVal && searchInputHeader) {
    searchInputHeader.value = searchVal;
  }
});
/*search----------------------------*/
/*login----------------------------*/
const openLogin = document.querySelector(".login-unloged");
const loginSystem = document.querySelector(".login-center");
const hideMenu = document.querySelector(".nav");
const hideMovilMenu = document.querySelector(".mobile-menu-toggle");
const hideSearch = document.querySelector(".shearch-menu");
const closeLogin = document.querySelector(".overlayLogin");
const loginTry = document.querySelector(".login-btn");
const loginErr = document.querySelector(".login-error");
const loginForm = document.querySelector(".login-form");

openLogin.addEventListener("click", () => {
  closeMenu();
  headerActive.classList.add("active");
  loginSystem.classList.add("active");
  openLogin.classList.add("active");
  hideMenu.classList.add("unactive");
  hideMovilMenu.classList.add("inactive");
  hideSearch.classList.add("inactive");
  closeLogin.classList.add("active");
  navIzquierda.classList.add("inactive");
  navDerecha.classList.add("inactive");
});

closeLogin.addEventListener("click", () => {
  headerActive.classList.remove("active");
  loginSystem.classList.remove("active");
  openLogin.classList.remove("active");
  hideMenu.classList.remove("unactive");
  hideMovilMenu.classList.remove("inactive");
  hideSearch.classList.remove("inactive");
  closeLogin.classList.remove("active");
  loginErr.classList.remove("active");
  navIzquierda.classList.remove("inactive");
  navDerecha.classList.remove("inactive");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    headerActive.classList.remove("active");
    loginSystem.classList.remove("active");
    openLogin.classList.remove("active");
    hideMenu.classList.remove("unactive");
    hideMovilMenu.classList.remove("inactive");
    hideSearch.classList.remove("inactive");
    closeLogin.classList.remove("active");
    loginErr.classList.remove("active");
    navIzquierda.classList.remove("inactive");
    navDerecha.classList.remove("inactive");
  }
});

loginTry.addEventListener("click", (e) => {
  // Use native validation (bubbles)
  if (!loginForm.checkValidity()) {
    // Let the browser show native validation tooltips
    loginForm.reportValidity();
  } else {
    // Only show "User not registered" if the form is formally valid
    e.preventDefault();
    loginErr.classList.add("active");
  }
});

/*login----------------------------*/

/*back to top*/
const backButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

  if (window.scrollY > 100) {
    backButton.classList.add("active");
  }
  else {
    backButton.classList.remove("active");
  }
})

/*main content*/

