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

    q.value = params.get("search") || "";
    if (location.hash === "#buscar") q.focus();
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
        grid.innerHTML = visible.map(window.SalcedoCard).join("");
        count.textContent = list.length === 1 ? "1 equipo" : list.length + " equipos";
        empty.hidden = list.length > 0;
        more.hidden = list.length <= state.shown;
    }

    [q, brand, sort].forEach((el) => el.addEventListener("input", () => { state.shown = PAGE_SIZE; render(); }));
    more.addEventListener("click", () => { state.shown += PAGE_SIZE; render(); });
    render();
})();
