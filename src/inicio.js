// Productos destacados de la página de inicio: los marcados como destacados, o los 4 primeros.
(function () {
    const all = window.SalcedoProducts || [];
    const featured = all.filter((p) => p.featured);
    document.getElementById("grid").innerHTML = (featured.length ? featured : all).slice(0, 4).map(window.SalcedoCard).join("");
})();
