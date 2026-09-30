// Tienda de Salcedo Equipment: filtros, búsqueda, orden y "ver más".
(function () {
    const PAGE_SIZE = 12;
    const all = window.SalcedoProducts || [];
    const $ = (id) => document.getElementById(id);
    const chips = $("chips"), grid = $("grid"), count = $("count"), empty = $("empty"), more = $("more");
    const q = $("q"), brand = $("brand"), sort = $("sort");
    const params = new URLSearchParams(location.search);
    const state = { category: params.get("category") || "Todos", shown: PAGE_SIZE };

    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const wa = (name) => "https://wa.me/51956614346?text=" + encodeURIComponent("Hola, quiero cotizar: " + name);

    q.value = params.get("search") || "";
    [...new Set(all.map((p) => p.brand))].sort().forEach((b) => brand.add(new Option(b, b)));
    if (params.get("brand")) brand.value = params.get("brand");

    ["Todos", ...new Set(all.map((p) => p.category))].forEach((c) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "chip"; b.dataset.cat = c; b.textContent = c;
        b.addEventListener("click", () => { state.category = c; state.shown = PAGE_SIZE; render(); });
        chips.appendChild(b);
    });

    function filtered() {
        const term = norm(q.value.trim());
        const list = all.filter((p) =>
            (state.category === "Todos" || p.category === state.category) &&
            (!brand.value || p.brand === brand.value) &&
            (!term || norm(p.name + " " + p.brand + " " + p.category + " " + p.desc).includes(term)));
        list.sort((a, b) => a.name.localeCompare(b.name, "es"));
        if (sort.value === "za") list.reverse();
        return list;
    }

    function render() {
        const list = filtered(), visible = list.slice(0, state.shown);
        chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === state.category)));
        grid.innerHTML = visible.map((p) =>
            '<article class="card"><div class="pic"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
            '<div class="body"><span class="cat">' + esc(p.category) + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p>' +
            '<div class="foot"><span class="brandname">' + esc(p.brand) + '</span>' +
            '<a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="' + wa(p.name) + '">Cotizar</a></div></div></article>').join("");
        count.textContent = list.length === 1 ? "1 equipo" : list.length + " equipos";
        empty.hidden = list.length > 0;
        more.hidden = list.length <= state.shown;
    }

    [q, brand, sort].forEach((el) => el.addEventListener("input", () => { state.shown = PAGE_SIZE; render(); }));
    more.addEventListener("click", () => { state.shown += PAGE_SIZE; render(); });
    render();
})();
