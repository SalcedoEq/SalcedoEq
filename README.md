# Salcedo Equipment

Sitio web de exposición y cotización de equipos médicos y mobiliario clínico.
Sitio estático publicado en GitHub Pages en https://www.salcedoequip.com

## Páginas
- `index.html`: inicio (portada, catálogo destacado, servicios, contacto).
- `tienda.html`: catálogo completo con buscador y filtros.
- `producto.html?id=N`: ficha de un equipo.
- `404.html`: página de error.

## Cómo agregar un producto
Edita `src/products.js` y agrega un objeto a la lista:

```js
{
    id: 20,                       // número único
    name: "Nombre del equipo",
    category: "Monitores",        // crea la categoría si no existe
    brand: "Marca",
    img: "images/products/equipamiento/foto.webp",
    desc: "Descripción corta."
}
```

Guarda la foto en `images/products/` (mejor en `.webp`, de unos 800 px de ancho).
Agrega también la línea del producto en `sitemap.xml`.

## Estilos
Todo el diseño está en `src/home.css`. Los colores del logo se definen al inicio del archivo (`--navy`, `--steel`).
