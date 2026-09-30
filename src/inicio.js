// Productos destacados de la página de inicio (los 4 primeros de products.js).
(function () {
    const grid = document.getElementById("grid");
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const wa = (name) => "https://wa.me/51956614346?text=" + encodeURIComponent("Hola, quiero cotizar: " + name);
    grid.innerHTML = (window.SalcedoProducts || []).slice(0, 4).map((p) =>
        '<article class="card"><a class="pic" href="producto.html?id=' + p.id + '"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
        '<div class="body"><span class="cat">' + esc(p.category) + '</span><h3><a href="producto.html?id=' + p.id + '">' + esc(p.name) + '</a></h3><p>' + esc(p.desc) + '</p>' +
        '<div class="foot"><span class="brandname">' + esc(p.brand) + '</span>' +
        '<a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="' + wa(p.name) + '">Cotizar</a></div></div></article>').join("");
})();
