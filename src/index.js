/*most frecuent*/
const carruselChangeEqHear = document.querySelector(".see-equipamiento");
const carruselChangeMobHear = document.querySelector(".see-mobiliario");
const carruselChangeSeeEq = document.querySelector(".equipameinto-prev");
const carruselChangeSeeMob = document.querySelector(".mobiliario-prev");
const aUpdateEq = document.querySelector(".store-hear-Eq");
const aUpdateMob = document.querySelector(".store-hear-Mob");

carruselChangeEqHear.addEventListener("mouseenter", carruselChangeEq);
carruselChangeMobHear.addEventListener("mouseenter", carruselChangeMob);

function carruselChangeEq () {
  carruselChangeSeeEq.classList.remove("inactive");
  carruselChangeSeeMob.classList.add("inactive");
  aUpdateEq.classList.add("active");
  aUpdateMob.classList.remove("active");
}
function carruselChangeMob () {
  carruselChangeSeeEq.classList.add("inactive");
  carruselChangeSeeMob.classList.remove("inactive");
  aUpdateEq.classList.remove("active");
  aUpdateMob.classList.add("active");
}

/*most frecuent--------------------*/

/* contact-secition*/

let lastScroll2 = 0;

const hearContact = document.querySelector(".contact-section");

window.addEventListener("scroll",()=> {
  const currentScroll2 = window.scrollY;
  const currentDivScroll= hearContact.getBoundingClientRect().top;
  if (currentScroll2>lastScroll2 && currentDivScroll<250 &&currentDivScroll>0) {
    window.scrollBy(0,hearContact.getBoundingClientRect().top);
  }
  lastScroll2 = currentScroll2;
})

/*consultoria*/
const cards = document.querySelectorAll(".consultoria-card");

cards.forEach((card) => {
    const front = card.querySelector(".consultoria-front");
    const back = card.querySelector(".consultoria-back");
    const icon = card.querySelector(".consultoria-icon");

    card.addEventListener("mouseenter", () => {
        front.classList.add("inactive");
        back.classList.remove("inactive");
        icon.classList.add("inactive");
    });

    card.addEventListener("mouseleave", () => {
        front.classList.remove("inactive");
        back.classList.add("inactive");
        icon.classList.remove("inactive");
    });
});
/*consultoria---------------------*/