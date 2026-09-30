// Página de detalle de un equipo: producto.html?id=1
(function () {
    const id = Number(new URLSearchParams(location.search).get("id"));
    const p = (window.SalcedoProducts || []).find((x) => x.id === id);
    const $ = (i) => document.getElementById(i);
    if (!p) { $("d-missing").hidden = false; return; }
    document.title = p.name + " | Salcedo Equipment";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = p.name + ". " + p.desc + " Cotiza por WhatsApp.";
    $("crumb-cat").textContent = p.category;
    $("d-img").src = p.img; $("d-img").alt = p.name;
    $("d-cat").textContent = p.category;
    $("d-name").textContent = p.name;
    $("d-brand").textContent = p.brand;
    $("d-desc").textContent = p.desc;
    $("d-wa").href = "https://wa.me/51956614346?text=" + encodeURIComponent("Hola, quiero cotizar: " + p.name);
    $("detail").hidden = false;
})();
