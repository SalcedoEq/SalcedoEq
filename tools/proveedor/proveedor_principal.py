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
  python tools/proveedor/proveedor_principal.py extraer --inicio "https://URL-DEL-PROVEEDOR/CATEGORIA"

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
CAMPOS = ["url", "nombre", "categoria", "marca", "modelo", "precio", "moneda", "stock", "foto", "descripcion"]


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


def texto(page, sel):
    if not sel:
        return ""
    el = page.query_selector(sel)
    return re.sub(r"\s+", " ", el.inner_text()).strip() if el else ""


def atributo(page, sel, attr):
    el = page.query_selector(sel) if sel else None
    return (el.get_attribute(attr) or "").strip() if el else ""


def extraer_producto(page, sel, url):
    # Respaldo generico: JSON-LD schema.org/Product y metadatos Open Graph.
    ld = {}
    for s in page.query_selector_all('script[type="application/ld+json"]'):
        try:
            data = json.loads(s.inner_text())
        except Exception:
            continue
        for d in data if isinstance(data, list) else [data]:
            if isinstance(d, dict) and d.get("@type") == "Product":
                ld = d
    oferta = ld.get("offers") or {}
    if isinstance(oferta, list):
        oferta = oferta[0] if oferta else {}
    marca_ld = (ld.get("brand") or {}).get("name", "") if isinstance(ld.get("brand"), dict) else ""
    foto = atributo(page, sel.get("foto"), "src") or atributo(page, 'meta[property="og:image"]', "content")
    return {
        "url": url,
        "nombre": texto(page, sel.get("nombre")) or ld.get("name", ""),
        "categoria": texto(page, sel.get("categoria")),
        "marca": texto(page, sel.get("marca")) or marca_ld,
        "modelo": texto(page, sel.get("modelo")) or ld.get("sku", ""),
        "precio": texto(page, sel.get("precio")) or str(oferta.get("price", "")),
        "moneda": oferta.get("priceCurrency", ""),
        "stock": texto(page, sel.get("stock")),
        "foto": urljoin(url, foto) if foto else "",
        "descripcion": texto(page, sel.get("descripcion")) or ld.get("description", ""),
    }


def extraer(args):
    if not CONFIG.exists():
        raise SystemExit(f"Falta {CONFIG.name}: copialo de selectores.ejemplo.json y ajustalo tras 'explorar'.")
    sel = json.loads(CONFIG.read_text(encoding="utf-8"))
    SALIDA.mkdir(exist_ok=True)
    filas, vistos, url = [], set(), args.inicio
    with sync_playwright() as p:
        ctx = abrir(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        ir(page, SITIO)
        input("Inicia sesion en el navegador y luego presiona ENTER aqui... ")
        paginas = 0
        while url and paginas < args.max_paginas:
            ir(page, url)
            paginas += 1
            enlaces = [urljoin(url, a.get_attribute("href")) for a in page.query_selector_all(sel["enlace_producto"]) if a.get_attribute("href")]
            siguiente = page.query_selector(sel["siguiente"]) if sel.get("siguiente") else None
            url_sig = urljoin(url, siguiente.get_attribute("href")) if siguiente and siguiente.get_attribute("href") else None
            print(f"Pagina {paginas}: {len(enlaces)} productos")
            for enlace in enlaces:
                if enlace in vistos:
                    continue
                vistos.add(enlace)
                pausa()
                ir(page, enlace)
                filas.append(extraer_producto(page, sel, enlace))
            url = url_sig
            pausa()
        ctx.close()
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
    e.add_argument("--max-paginas", type=int, default=50)
    e.set_defaults(fn=extraer)
    a = ap.parse_args()
    a.fn(a)
