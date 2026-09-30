// Menú del encabezado en pantallas pequeñas.
(function () {
    const header = document.querySelector(".top");
    const btn = document.querySelector(".menu-btn");
    if (!header || !btn) return;
    function set(open) {
        header.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }
    btn.addEventListener("click", () => set(!header.classList.contains("open")));
    document.querySelectorAll("#nav a").forEach((a) => a.addEventListener("click", () => set(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 820) set(false); });
})();
