// Utils
const s  = (sel, root=document) => root.querySelector(sel);
const ss = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// ---- Sticky header
const header = s('.header[data-sticky]');
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY || 0;
  header?.classList.toggle('is-stuck', y > 8);
  lastY = y;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Dropdowns (click/touch + teclado)
function closeAllDropdowns(except=null) {
  ss('.dropdown').forEach(dd => {
    if (dd !== except) {
      dd.classList.remove('open');
      const btn = dd.querySelector('.dropbtn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
}
ss('.dropdown .dropbtn').forEach(btn => {
  const dropdown = btn.closest('.dropdown');
  const panel = dropdown.querySelector('.dropdown-content');

  // Abrir/cerrar por click
  btn.addEventListener('click', (e) => {
    const isOpen = dropdown.classList.contains('open');
    closeAllDropdowns(dropdown);
    dropdown.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) {
      // focus primer item
      const first = panel?.querySelector('[role="menuitem"]');
      first?.focus();
    }
    e.stopPropagation();
  });

  // Teclado: Down abre; Esc cierra
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      dropdown.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      panel?.querySelector('[role="menuitem"]')?.focus();
    }
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });

  // Navegación dentro del menú
  panel?.addEventListener('keydown', (e) => {
    const items = ss('#' + panel.id + ' [role="menuitem"]');
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i+1) % items.length]?.focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); items[(i-1+items.length) % items.length]?.focus(); }
    if (e.key === 'Escape')    { dropdown.classList.remove('open'); btn.setAttribute('aria-expanded','false'); btn.focus(); }
  });
});

// Cerrar al hacer click fuera
document.addEventListener('click', () => closeAllDropdowns());

// ---- Menú móvil
const mobileToggle = s('.mobile-menu-toggle');
const mobileMenu = s('#mobile-menu');
function setMobile(open) {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open', open);
  mobileMenu.hidden = !open;
  mobileToggle?.setAttribute('aria-expanded', String(open));
}
mobileToggle?.addEventListener('click', (e) => {
  const open = !mobileMenu.classList.contains('open');
  setMobile(open);
  e.stopPropagation();
});
document.addEventListener('click', (e) => {
  if (!mobileMenu?.contains(e.target) && !mobileToggle?.contains(e.target)) setMobile(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMobile(false);
});

// ---- Idioma (demo)
ss('[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    console.log('Idioma seleccionado:', lang);
    closeAllDropdowns();
  });
});

// Helpers
const s  = (s, r=document) => r.querySelector(s);
const ss = (s, r=document) => Array.from(r.querySelectorAll(s));

console.log('main.js cargado ✅'); // Debe verse en consola

// Cerrar todos menos uno
function closeAll(except=null){
  ss('.nav-item.dropdown').forEach(dd=>{
    if(dd!==except){
      dd.classList.remove('open');
      dd.querySelector('.dropbtn')?.setAttribute('aria-expanded','false');
    }
  });
}

// Activar por click/touch
ss('.nav-item.dropdown .dropbtn').forEach(btn=>{
  const dd = btn.closest('.nav-item.dropdown');
  btn.addEventListener('click', (e)=>{
    const open = dd.classList.contains('open');
    closeAll(dd);
    dd.classList.toggle('open', !open);
    btn.setAttribute('aria-expanded', String(!open));
    e.stopPropagation();
  });
});

// Cerrar al hacer click fuera y con ESC
document.addEventListener('click', ()=> closeAll());
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeAll(); });

// Helpers
const s  = (selector, root = document) => root.querySelector(selector);
const ss = (selector, root = document) => Array.from(root.querySelectorAll(selector));

console.log('main.js cargado ✅');

// Cerrar todos los menús menos uno
function closeAll(except = null) {
  ss('.nav-item.dropdown').forEach(dd => {
    if (dd !== except) {
      dd.classList.remove('open');
      dd.querySelector('.dropbtn')?.setAttribute('aria-expanded', 'false');
    }
  });
}

// Inicializar cada dropdown
ss('.nav-item.dropdown').forEach(dd => {
  const btn   = dd.querySelector('.dropbtn');
  const panel = dd.querySelector('.dropdown-content');
  let hideT   = null;

  // Abrir menú
  function open() {
    closeAll(dd);
    dd.classList.add('open');
    btn?.setAttribute('aria-expanded', 'true');
  }

  // Cerrar menú
  function close() {
    dd.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  }

  // Cierre retardado (para permitir pasar al panel)
  function delayedClose() {
    clearTimeout(hideT);
    hideT = setTimeout(close, 160);
  }

  // Click/tap: abrir o cerrar
  btn?.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dd.classList.contains('open');
    if (isOpen) close();
    else open();
  });

  // Hover-intent: mantener abierto mientras el mouse está en el botón o panel
  btn?.addEventListener('mouseenter', open);
  panel?.addEventListener('mouseenter', () => {
    clearTimeout(hideT);
    open();
  });

  btn?.addEventListener('mouseleave', delayedClose);
  panel?.addEventListener('mouseleave', delayedClose);

  // Accesibilidad por teclado
  btn?.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      open();
      panel?.querySelector('[role="menuitem"], a, button')?.focus();
    }
    if (e.key === 'Escape') {
      close();
      btn.focus();
    }
  });
});

// Cerrar al hacer click fuera o presionar Esc
document.addEventListener('click', () => closeAll());
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAll();
});
