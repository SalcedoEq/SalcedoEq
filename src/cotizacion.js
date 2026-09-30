// Lista de cotización: el cliente junta varios equipos y los envía en un solo mensaje de WhatsApp.
// Se guarda en el navegador del visitante (localStorage).
(function () {
    const KEY = "salcedo-cotizacion";
    const WA = "51956614346";
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
    function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* sin almacenamiento */ } }
    let items = load();

    function sku(p) { return p.sku || "SE-" + String(p.id).padStart(4, "0"); }
    function money(v, cur) {
        return new Intl.NumberFormat("es-PE", { style: "currency", currency: cur || "PEN", minimumFractionDigits: 2 }).format(v).replace("PEN", "S/");
    }

    // Panel lateral
    const panel = document.createElement("div");
    panel.innerHTML =
        '<div class="q-overlay" hidden></div>' +
        '<aside class="q-panel" id="q-panel" hidden aria-label="Tu cotización">' +
        '<div class="q-head"><h2>Tu cotización</h2><button class="q-close" type="button" aria-label="Cerrar">&times;</button></div>' +
        '<div class="q-body" id="q-body"></div>' +
        '<div class="q-foot" id="q-foot"></div></aside>';
    document.body.appendChild(panel);
    const overlay = panel.querySelector(".q-overlay"), aside = panel.querySelector(".q-panel");

    function open() { overlay.hidden = false; aside.hidden = false; render(); aside.querySelector(".q-close").focus(); }
    function close() { overlay.hidden = true; aside.hidden = true; }
    overlay.addEventListener("click", close);
    aside.querySelector(".q-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    function message() {
        const lines = items.map((i) => "- " + i.qty + " x " + i.name + " (" + i.sku + ")");
        return "Hola, quiero cotizar:\n" + lines.join("\n");
    }

    function render() {
        const count = items.reduce((n, i) => n + i.qty, 0);
        document.querySelectorAll(".quote-count").forEach((el) => { el.textContent = count; el.hidden = count === 0; });
        const body = document.getElementById("q-body"), foot = document.getElementById("q-foot");
        if (!items.length) {
            body.innerHTML = '<p class="q-empty">Aún no agregas equipos. Entra a la tienda y pulsa "Agregar" en los que necesites.</p>';
            foot.innerHTML = '<a class="btn btn-primary" href="/tienda.html">Ir a la tienda</a>';
            return;
        }
        body.innerHTML = items.map((i, n) =>
            '<div class="q-item"><img src="' + esc(i.img) + '" alt=""><div class="q-info"><strong>' + esc(i.name) + '</strong>' +
            '<small>' + esc(i.sku) + (i.price ? " · " + money(i.price, i.currency) : "") + '</small>' +
            '<div class="qty qty-sm"><button type="button" data-n="' + n + '" data-d="-1" aria-label="Quitar uno">−</button><span>' + i.qty + '</span>' +
            '<button type="button" data-n="' + n + '" data-d="1" aria-label="Agregar uno">+</button></div></div>' +
            '<button class="q-remove" type="button" data-rm="' + n + '" aria-label="Quitar ' + esc(i.name) + '">&times;</button></div>').join("");
        const priced = items.filter((i) => i.price);
        const total = priced.length === items.length ? priced.reduce((s, i) => s + i.price * i.qty, 0) : null;
        foot.innerHTML = (total ? '<p class="q-total">Total referencial <strong>' + money(total, items[0].currency) + '</strong></p>' : '<p class="q-total">Te enviaremos los precios en la cotización.</p>') +
            '<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/' + WA + '?text=' + encodeURIComponent(message()) + '">Enviar por WhatsApp</a>' +
            '<button class="btn btn-ghost q-clear" type="button">Vaciar lista</button>';
    }

    aside.addEventListener("click", (e) => {
        const t = e.target.closest("button"); if (!t) return;
        if (t.dataset.d) { const i = items[+t.dataset.n]; i.qty = Math.max(1, i.qty + +t.dataset.d); }
        else if (t.dataset.rm) items.splice(+t.dataset.rm, 1);
        else if (t.classList.contains("q-clear")) items = [];
        else return;
        save(items); render();
    });

    function add(p, qty) {
        qty = Math.max(1, qty || 1);
        const found = items.find((i) => i.id === p.id);
        if (found) found.qty += qty;
        else items.push({ id: p.id, name: p.name, sku: sku(p), price: p.price || null, currency: p.currency || "PEN", img: p.img, qty: qty });
        save(items); open();
    }

    document.querySelectorAll(".quote-btn").forEach((b) => b.addEventListener("click", open));
    // Botones "Agregar" de las tarjetas (tienda e inicio)
    document.addEventListener("click", (e) => {
        const b = e.target.closest("[data-add]"); if (!b) return;
        const p = (window.SalcedoProducts || []).find((x) => x.id === +b.dataset.add);
        if (p) add(p, 1);
    });
    window.addEventListener("storage", (e) => { if (e.key === KEY) { items = load(); render(); } });

    window.SalcedoQuote = { add, sku, money };
    render();
})();
