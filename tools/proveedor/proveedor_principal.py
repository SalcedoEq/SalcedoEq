#!/usr/bin/env python3
"""Lector de catalogo del proveedor principal para correr en TU PC.

La contrasena la escribes tu en el navegador que se abre; el script nunca la
pide ni la guarda. La sesion (cookies) queda en ./tools/proveedor/.perfil,
que esta en .gitignore.

Uso:
  pip install playwright && playwright install chromium

  # 1) Explorar: inicia sesion, navega y guarda el HTML de las paginas que
  #    quieras (un listado, un producto...) para ajustar los selectores.
  python tools/proveedor/proveedor_principal.py explorar

  # 2) Extraer: recorre el catalogo con los selectores de selectores.json
  python tools/proveedor/proveedor_principal.py extraer --inicio "URL-DEL-LISTADO"            # rapido: solo listado
  python tools/proveedor/proveedor_principal.py extraer --inicio "URL-DEL-LISTADO" --detalle  # + ficha de cada producto

Resultado: tools/proveedor/salida/proveedor.csv
Usa un ritmo tranquilo (pausas de 2-4 s). Revisa los terminos del proveedor:
para uso interno de tus precios suele estar bien; republicar sus fotos/textos
requiere su permiso.
"""
import argparse
import os
import csv
import json
import random
import re
import time
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

AQUI = Path(__file__).parent
PERFIL = AQUI / ".perfil"
SALIDA = AQUI / "salida"
CONFIG = AQUI / "selectores.json"
# La direccion del proveedor NO se guarda en el repo: definela en tu PC con
#   set PROVEEDOR_URL=https://...   (Windows)   |   export PROVEEDOR_URL=https://...   (Mac/Linux)
SITIO = os.environ.get("PROVEEDOR_URL", "")
if not SITIO:
    raise SystemExit("Define la variable de entorno PROVEEDOR_URL (direccion inicial del proveedor).")
CAMPOS = ["url", "codigo", "nombre", "marca", "modelo", "precio", "moneda", "stock", "foto", "descripcion"]


def ir(page, url):
    """Abre una URL sin morir si el sitio es lento: espera hasta 2 min y continua."""
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=120000)
    except Exception as e:
        print(f"Aviso: {url} tardo o fallo ({str(e).splitlines()[0]}). Continuo con lo que haya cargado.")
    try:
        page.wait_for_load_state("networkidle", timeout=20000)
    except Exception:
        pass


def pausa():
    time.sleep(random.uniform(2, 4))


def abrir(p):
    # Usa tu Chrome instalado (si existe) con un perfil aparte solo para esto:
    # inicias sesion una vez y queda guardada. Si no hay Chrome, usa Chromium.
    opciones = dict(user_data_dir=str(PERFIL), headless=False, viewport=None, args=["--start-maximized"])
    try:
        return p.chromium.launch_persistent_context(channel="chrome", **opciones)
    except Exception:
        return p.chromium.launch_persistent_context(**opciones)


def pagina_actual(ctx):
    """La pestana abierta mas reciente (por si abres pestanas nuevas)."""
    paginas = [x for x in ctx.pages if not x.is_closed()]
    if not paginas:
        raise SystemExit("La ventana del navegador se cerro. Vuelve a ejecutar y dejala abierta hasta terminar.")
    return paginas[-1]


def explorar(_args):
    SALIDA.mkdir(exist_ok=True)
    with sync_playwright() as p:
        ctx = abrir(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        ir(page, SITIO)
        print("Inicia sesion en el navegador y ve a la pagina que quieras guardar.")
        n = 0
        while True:
            r = input("ENTER = guardar esta pagina | 'q' = salir: ").strip().lower()
            if r == "q":
                break
            page = pagina_actual(ctx)
            n += 1
            base = SALIDA / f"pagina_{n:02d}"
            base.with_suffix(".html").write_text(page.content(), encoding="utf-8")
            page.screenshot(path=str(base.with_suffix(".png")), full_page=True)
            print(f"Guardado {base.name}.html/.png  ({page.url})")
        ctx.close()
    print(f"Listo. Sube la carpeta {SALIDA} (sin credenciales) a Drive o al repo para ajustar los selectores.")


def valor(nodo, spec, regex=None):
    """spec: 'selector' (texto) o 'selector@atributo'. Admite prefijo 'xpath='."""
    if not spec:
        return ""
    m = re.match(r"^(.*)@([A-Za-z-]+)$", spec)
    sel, attr = (m.group(1), m.group(2)) if m else (spec, "")
    el = nodo.query_selector(sel)
    if not el:
        return ""
    v = el.get_attribute(attr) if attr else el.inner_text()
    v = re.sub(r"\s+", " ", v or "").strip()
    if regex:
        m = re.search(regex, v)
        v = m.group(1) if m else ""
    return v


def cargar_todo(page, sel):
    """Pulsa 'Ver mas productos' hasta que no haya mas (o no aparezcan nuevos)."""
    boton = sel.get("boton_mas")
    while boton:
        antes = len(page.query_selector_all(sel["tarjeta"]))
        b = page.query_selector(boton)
        if not b or not b.is_visible():
            break
        b.scroll_into_view_if_needed()
        b.click()
        pausa()
        page.wait_for_timeout(1500)
        despues = len(page.query_selector_all(sel["tarjeta"]))
        print(f"  cargados {despues} productos")
        if despues <= antes:
            break


def limpiar_precio(txt):
    """'US$ 1,430.00 (incluido IGV) ...' -> '1430.00' (primer importe)."""
    m = re.search(r"([\d.,]+\d)", txt or "")
    return m.group(1).replace(",", "") if m else ""


def leer_tarjetas(page, sel, base):
    filas = []
    for t in page.query_selector_all(sel["tarjeta"]):
        enlace = valor(t, sel.get("enlace"))
        foto = valor(t, sel.get("foto"))
        precio = limpiar_precio(valor(t, sel.get("precio")))
        filas.append({
            "url": urljoin(base, enlace) if enlace else "",
            "codigo": valor(t, sel.get("codigo"), sel.get("codigo_regex")),
            "nombre": valor(t, sel.get("nombre")),
            "marca": valor(t, sel.get("marca")),
            "modelo": valor(t, sel.get("modelo")),
            "precio": precio,
            "moneda": "USD" if precio else "",
            "stock": "",
            "foto": urljoin(base, foto) if foto else "",
            "descripcion": "",
        })
    return filas


def completar_detalle(page, fila, sel):
    d = sel.get("detalle", {})
    ir(page, fila["url"])
    for campo in ("codigo", "marca", "modelo", "stock", "descripcion", "nombre"):
        v = valor(page, d.get(campo), d.get(campo + "_regex"))
        if campo == "marca" and "/" in v:  # la marca viene como logo: usa el nombre del archivo
            v = Path(v).stem
        if campo == "stock":
            v = "".join(re.findall(r"\d+", v))
        if campo == "descripcion":
            v = re.sub(r"^Descripci[oó]n:\s*", "", v)
        if v:
            fila[campo] = v


def extraer(args):
    if not CONFIG.exists():
        raise SystemExit(f"Falta {CONFIG.name}: copialo de selectores.ejemplo.json y ajustalo.")
    sel = json.loads(CONFIG.read_text(encoding="utf-8"))
    SALIDA.mkdir(exist_ok=True)
    with sync_playwright() as p:
        ctx = abrir(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        ir(page, SITIO)
        input("Inicia sesion en el navegador y luego presiona ENTER aqui... ")
        ir(page, args.inicio)
        cargar_todo(page, sel)
        filas = leer_tarjetas(page, sel, page.url)
        print(f"{len(filas)} productos en el listado")
        if args.detalle:
            for i, fila in enumerate(filas[: args.limite or None], 1):
                if not fila["url"]:
                    continue
                pausa()
                completar_detalle(page, fila, sel)
                if i % 25 == 0:
                    print(f"  detalle {i}/{len(filas)}")
                    guardar(filas)
        ctx.close()
    guardar(filas)


def guardar(filas):
    ruta = SALIDA / "proveedor.csv"
    with open(ruta, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=CAMPOS, quoting=csv.QUOTE_ALL)
        w.writeheader()
        w.writerows(filas)
    print(f"{len(filas)} productos -> {ruta}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("explorar").set_defaults(fn=explorar)
    e = sub.add_parser("extraer")
    e.add_argument("--inicio", required=True, help="URL de la primera pagina de listado")
    e.add_argument("--detalle", action="store_true", help="entra a cada producto (lento) para modelo, stock y descripcion")
    e.add_argument("--limite", type=int, default=0, help="con --detalle: solo los primeros N productos (para probar)")
    e.set_defaults(fn=extraer)
    a = ap.parse_args()
    a.fn(a)
