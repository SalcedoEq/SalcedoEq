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

/* Carousel navigation — infinite loop */
function initCarousel(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;
    let isAnimating = false;

    function getCardWidth() {
        const firstCard = track.querySelector(".carousel-card");
        if (!firstCard) return 281;
        return firstCard.offsetWidth + 1;
    }

    function smoothScroll(distance, duration) {
        if (isAnimating) return;
        isAnimating = true;
        const start = track.scrollLeft;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            /* easeInOutCubic */
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            track.scrollLeft = start + distance * ease;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                track.scrollLeft = start + distance;
                isAnimating = false;
            }
        }
        requestAnimationFrame(step);
    }

    function scrollRight() {
        if (isAnimating) return;
        const cardW = getCardWidth();
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (maxScroll <= 2) {
            /* All cards fit, move first to end anyway for loop effect */
            const first = track.firstElementChild;
            track.appendChild(first);
            return;
        }

        if (track.scrollLeft >= maxScroll - 2) {
            const first = track.firstElementChild;
            track.appendChild(first);
            track.scrollLeft = track.scrollLeft - cardW;
        }
        smoothScroll(cardW, 300);
    }

    function scrollLeft() {
        if (isAnimating) return;
        const cardW = getCardWidth();
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (maxScroll <= 2) {
            const last = track.lastElementChild;
            track.insertBefore(last, track.firstElementChild);
            return;
        }

        if (track.scrollLeft <= 2) {
            const last = track.lastElementChild;
            track.insertBefore(last, track.firstElementChild);
            track.scrollLeft = track.scrollLeft + cardW;
        }
        smoothScroll(-cardW, 300);
    }

    return { scrollRight, scrollLeft };
}

const carousels = {
    eq: initCarousel("carousel-eq"),
    mob: initCarousel("carousel-mob")
};

document.querySelectorAll(".carousel-arrow").forEach((arrow) => {
    arrow.addEventListener("click", () => {
        const id = arrow.dataset.carousel;
        const carousel = carousels[id];
        if (!carousel) return;

        if (arrow.classList.contains("carousel-arrow-left")) {
            carousel.scrollLeft();
        } else {
            carousel.scrollRight();
        }
    });
});
/*carousel navigation--------------*/

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

/*consultoria removed - now handled via pure CSS for better mobile support*/