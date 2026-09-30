// Ficha de un equipo: producto.html?id=1
(function () {
    const all = window.SalcedoProducts || [];
    const id = Number(new URLSearchParams(location.search).get("id"));
    const p = all.find((x) => x.id === id);
    const $ = (i) => document.getElementById(i);
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    if (!p) { $("d-missing").hidden = false; return; }
    const Q = window.SalcedoQuote;

    document.title = p.name + " | Salcedo Equipment";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = p.name + ". " + p.desc + " Cotiza con Salcedo Equipment.";

    $("crumb-cat").textContent = p.category;
    $("crumb-cat").href = "tienda.html?category=" + encodeURIComponent(p.category);
    $("crumb-name").textContent = p.name;
    $("d-cat").textContent = p.category;
    $("d-name").textContent = p.name;
    $("d-brand").textContent = p.brand;
    $("d-sku").textContent = Q.sku(p);
    $("d-desc").textContent = p.desc;
    if (p.badge) { $("d-badge").textContent = p.badge; $("d-badge").hidden = false; }

    // Precio
    if (p.price) {
        $("d-price").textContent = Q.money(p.price, p.currency);
        $("d-price-note").textContent = p.igv === false ? "Más IGV" : "Incluye IGV";
    } else {
        $("d-price").textContent = "Precio a consultar";
        $("d-price").classList.add("muted");
        $("d-price-note").textContent = "Te lo enviamos en la cotización";
    }

    // Stock
    if (typeof p.stock === "number") {
        const s = $("d-stock");
        s.hidden = false;
        s.className = "stock " + (p.stock > 0 ? "ok" : "out");
        s.textContent = (p.stock > 0 ? "Disponible: " + p.stock + (p.stock === 1 ? " unidad" : " unidades") : "Agotado, consulta plazo de importación") +
            (p.stockDate ? " (actualizado " + p.stockDate + ")" : "");
    }

    // Galería
    const photos = [p.img].concat(p.photos || []);
    let cur = 0;
    function show(n) {
        cur = (n + photos.length) % photos.length;
        $("d-img").src = photos[cur];
        $("d-img").alt = p.name + (photos.length > 1 ? ", foto " + (cur + 1) + " de " + photos.length : "");
        $("d-thumbs").querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-current", String(i === cur)));
    }
    if (photos.length > 1) {
        $("d-thumbs").hidden = false;
        $("d-thumbs").innerHTML = photos.map((src, i) => '<button type="button" aria-label="Ver foto ' + (i + 1) + '"><img src="' + esc(src) + '" alt=""></button>').join("");
        $("d-thumbs").querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => show(i)));
        document.querySelectorAll(".g-nav").forEach((b) => { b.hidden = false; });
        document.querySelector(".g-prev").addEventListener("click", () => show(cur - 1));
        document.querySelector(".g-next").addEventListener("click", () => show(cur + 1));
    }
    show(0);

    // Cantidad y cotización
    const qty = $("q-qty");
    const clamp = () => { qty.value = Math.max(1, parseInt(qty.value, 10) || 1); };
    $("q-minus").addEventListener("click", () => { qty.value = (parseInt(qty.value, 10) || 1) - 1; clamp(); });
    $("q-plus").addEventListener("click", () => { qty.value = (parseInt(qty.value, 10) || 1) + 1; clamp(); });
    qty.addEventListener("change", clamp);
    $("d-add").addEventListener("click", () => { clamp(); Q.add(p, parseInt(qty.value, 10)); });
    $("d-wa").href = "https://wa.me/51956614346?text=" + encodeURIComponent("Hola, quiero cotizar: " + p.name + " (" + Q.sku(p) + ")");

    // Garantía, entrega y servicios
    const info = [];
    if (p.warranty) info.push("Garantía: " + p.warranty);
    if (p.delivery) info.push("Entrega: " + p.delivery);
    info.push("Evaluación técnica de especificaciones", "Instalación y capacitación para tu personal", "Soporte y mantenimiento");
    $("d-list").innerHTML = info.map((t) => "<li>" + esc(t) + "</li>").join("");

    // Documentos
    if (p.docs && p.docs.length) {
        $("d-docs").hidden = false;
        $("d-docs-list").innerHTML = p.docs.map((d) => '<li><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.name) + "</a></li>").join("");
    }

    // Compartir
    const url = location.href;
    $("sh-wa").href = "https://wa.me/?text=" + encodeURIComponent(p.name + " " + url);
    $("sh-fb").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    $("sh-in").href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
    $("sh-copy").addEventListener("click", () => {
        const ok = () => { $("sh-ok").hidden = false; setTimeout(() => { $("sh-ok").hidden = true; }, 2000); };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, () => {});
    });

    // Características por secciones
    if (p.specs && p.specs.length) {
        $("d-specs").hidden = false;
        $("d-specs-body").innerHTML = p.specs.map((s) =>
            "<div><h3>" + esc(s.title) + "</h3><ul>" + s.items.map((i) => "<li>" + esc(i) + "</li>").join("") + "</ul></div>").join("");
    }

    // Relacionados: misma categoría primero, luego el resto
    const rel = all.filter((x) => x.id !== p.id && x.category === p.category)
        .concat(all.filter((x) => x.id !== p.id && x.category !== p.category)).slice(0, 4);
    if (rel.length) { $("d-related").hidden = false; $("d-related-grid").innerHTML = rel.map(window.SalcedoCard).join(""); }

    $("detail").hidden = false;
})();
