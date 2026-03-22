
/*header----------------------*/
/*menu hamburguesa */
const openMobileMenu = document.querySelector(".mobile-menu-toggle")
const closeMobileMenu = document.querySelector(".close-menu-toggle")
const navMenu = document.querySelector(".nav")
const overlay = document.querySelector(".overlay")
const navIntern = document.querySelectorAll(".nav a")
const closeAppear = document.querySelector(".close-menu-toggle")
const mobileMenuDisappear = document.querySelector(".mobile-menu-toggle")

function updateInerStatus () {
  if (window.innerWidth <= 640 && !navMenu.classList.contains("inert")){
    navMenu.setAttribute("inert", ""); 
    openMobileMenu.setAttribute("aria-expanded", "false");
  }
  else {
    navMenu.removeAttribute("inert");
    openMobileMenu.setAttribute("aria-expanded", "true");

  }
}

updateInerStatus();
window.addEventListener("resize",updateInerStatus)

openMobileMenu.addEventListener("click", () =>{
  closeMenu ()
  navMenu.classList.add("active");
  overlay.classList.add("active");
  closeAppear.classList.add("active");
  mobileMenuDisappear.classList.add("inactive");
  navMenu.removeAttribute("inert");
  openMobileMenu.setAttribute("aria-expanded", "true");
});

function closeMenu () {
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
  searchBar.classList.remove("active");
  hideSearch.classList.remove("inactive");
  overlaySearch.classList.remove("active");
  updateInerStatus();
};

closeMobileMenu.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){
    closeMenu();
  }
});

navIntern.forEach((link) => {
  link.addEventListener("click",closeMenu);
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

navProducto.addEventListener("click", () =>{
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
});

navPortafolio.addEventListener("click", () =>{
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
});

navRecomendado.addEventListener("click", () =>{
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
});

navConsultoria.addEventListener("click", () =>{
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
});

/*desplegables----------------------*/
/*header----------------------*/


/*search*/
const openSearch = document.querySelector(".shearch-menu");
const searchBar = document.querySelector(".search-form");
const overlaySearch = document.querySelector(".overlaySearch");


openSearch.addEventListener("click", () =>{
  closeMenu();
  searchBar.classList.add("active");
  hideSearch.classList.add("inactive");
  overlaySearch.classList.add("active");
});

overlaySearch.addEventListener("click", () =>{
    closeMenu();
});

/*search----------------------------*/
/*login----------------------------*/
const openLogin = document.querySelector(".login-unloged");
const loginSystem = document.querySelector(".login-center");
const hideMenu = document.querySelector(".nav")
const hideMovilMenu = document.querySelector(".mobile-menu-toggle")
const hideSearch = document.querySelector(".shearch-menu")
const closeLogin = document.querySelector(".overlayLogin")
const loginTry = document.querySelector(".login-btn");
const loginErr = document.querySelector(".login-error");

openLogin.addEventListener("click", () =>{
  closeMenu();
  loginSystem.classList.add("active");
  openLogin.classList.add("active");
  hideMenu.classList.add("unactive");
  hideMovilMenu.classList.add("inactive");
  hideSearch.classList.add("inactive");
  closeLogin.classList.add("active");
});

closeLogin.addEventListener("click", () =>{
  loginSystem.classList.remove("active");
  openLogin.classList.remove("active");
  hideMenu.classList.remove("unactive");
  hideMovilMenu.classList.remove("inactive");
  hideSearch.classList.remove("inactive");
  closeLogin.classList.remove("active");
  loginErr.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){
    loginSystem.classList.remove("active");
    openLogin.classList.remove("active");
    hideMenu.classList.remove("unactive");
    hideMovilMenu.classList.remove("inactive");
    hideSearch.classList.remove("inactive");
    closeLogin.classList.remove("active");
    loginErr.classList.remove("active");
  }
});

loginTry.addEventListener("click", () =>{
  loginErr.classList.add("active");
});

/*login----------------------------*/
