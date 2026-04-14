/*most frecuent*/
const carruselChangeEqHear = document.querySelector(".see-equipamiento");
const carruselChangeMobHear = document.querySelector(".see-mobiliario");
const carruselChangeSeeEq = document.querySelector(".equipameinto-prev");
const carruselChangeSeeMob = document.querySelector(".mobiliario-prev");
const aUpdateEq = document.querySelector(".store-hear-Eq");
const aUpdateMob = document.querySelector(".store-hear-Mob");

if (carruselChangeEqHear && carruselChangeMobHear) {
    /* Destkop logic */
    carruselChangeEqHear.addEventListener("mouseenter", carruselChangeEq);
    carruselChangeMobHear.addEventListener("mouseenter", carruselChangeMob);
    
    /* Mobile logic */
    carruselChangeEqHear.addEventListener("click", carruselChangeEq);
    carruselChangeMobHear.addEventListener("click", carruselChangeMob);
}

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
function renderIndexCarousels() {
    const products = window.SalcedoProducts || [];
    const eqTrack = document.getElementById("carousel-eq");
    const mobTrack = document.getElementById("carousel-mob");

    if (!eqTrack || !mobTrack) return;

    // Selection criteria: First 8 of each globalType
    const eqProducts = products.filter(p => p.globalType === "Equipamiento").slice(0, 8);
    const mobProducts = products.filter(p => p.globalType === "Mobiliario").slice(0, 8);

    function createCard(p) {
        return `
            <a href="tienda.html?search=${encodeURIComponent(p.name)}" class="carousel-card">
                <div class="carousel-card-img">
                    <img src="${p.img}" alt="${p.name}" loading="lazy">
                </div>
                <div class="carousel-card-body">
                    <span class="carousel-card-tag">${p.category}</span>
                    <h4>${p.name}</h4>
                    <p>${p.desc || ""}</p>
                </div>
                <svg class="carousel-card-arrow" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M7 3L12 8L7 13" fill="none" stroke="currentColor" stroke-width="1.5" />
                </svg>
            </a>
        `;
    }

    eqTrack.innerHTML = eqProducts.map(createCard).join("");
    mobTrack.innerHTML = mobProducts.map(createCard).join("");
}

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
            if (first) track.appendChild(first);
            return;
        }

        if (track.scrollLeft >= maxScroll - 2) {
            const first = track.firstElementChild;
            if (first) {
                track.appendChild(first);
                track.scrollLeft = track.scrollLeft - cardW;
            }
        }
        smoothScroll(cardW, 300);
    }

    function scrollLeft() {
        if (isAnimating) return;
        const cardW = getCardWidth();
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (maxScroll <= 2) {
            const last = track.lastElementChild;
            if (last) track.insertBefore(last, track.firstElementChild);
            return;
        }

        if (track.scrollLeft <= 2) {
            const last = track.lastElementChild;
            if (last) {
                track.insertBefore(last, track.firstElementChild);
                track.scrollLeft = track.scrollLeft + cardW;
            }
        }
        smoothScroll(-cardW, 300);
    }

    return { scrollRight, scrollLeft };
}

// Global scope initialization
let carousels = {};

window.addEventListener("DOMContentLoaded", () => {
    // 1. Render content
    renderIndexCarousels();

    // 2. Initialize carousel logic AFTER content is rendered
    carousels.eq = initCarousel("carousel-eq");
    carousels.mob = initCarousel("carousel-mob");

    // 3. Bind arrows
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