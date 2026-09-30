// Tarjeta de producto compartida por la tienda y el inicio.
window.SalcedoCard = function (p) {
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const url = "producto.html?id=" + p.id;
    const price = p.price
        ? new Intl.NumberFormat("es-PE", { style: "currency", currency: p.currency || "PEN", minimumFractionDigits: 2 }).format(p.price).replace("PEN", "S/")
        : "Precio a consultar";
    return '<article class="card">' + (p.badge ? '<span class="ribbon">' + esc(p.badge) + '</span>' : '') +
        '<a class="pic" href="' + url + '"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
        '<div class="body"><span class="cat">' + esc(p.category) + '</span><h3><a href="' + url + '">' + esc(p.name) + '</a></h3>' +
        '<p>' + esc(p.desc) + '</p><span class="card-price' + (p.price ? '' : ' muted') + '">' + price + '</span>' +
        '<div class="foot"><span class="brandname">' + esc(p.brand) + '</span>' +
        '<button class="btn btn-primary btn-sm" type="button" data-add="' + p.id + '">Agregar</button></div></div></article>';
};
