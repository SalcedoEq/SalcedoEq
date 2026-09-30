// Base de datos de productos - Salcedo Equipment
// Solo añadir o remover objetos de esta lista.
// Campos obligatorios: id (único), name, category, brand, img (foto principal), desc.
// Campos opcionales (si faltan, la página se adapta):
//   sku: "1-004-00040"        código del equipo (si falta se usa SE-000id)
//   price: 67260               número sin símbolos; si falta se muestra "Precio a consultar"
//   currency: "PEN" | "USD"    igv: true (incluye IGV) | false (más IGV)
//   stock: 3                   stockDate: "30/09/2026"
//   badge: "Nuevo"             etiqueta en la esquina de la foto
//   featured: true             aparece en la portada
//   photos: ["images/...webp"] fotos adicionales para la galería
//   warranty: "12 meses"       delivery: "2 a 3 días hábiles en Lima"
//   docs: [{ name: "Ficha técnica (PDF)", url: "docs/ficha.pdf" }]
//   specs: [{ title: "Pantalla", items: ["15 pulgadas", "Táctil"] }]
window.SalcedoProducts = [
    // --- EQUIPAMIENTO MÉDICO ---
    {
        id: 1,
        name: "Monitor de Paciente Multiparámetros",
        category: "Monitores",
        brand: "Mindray",
        img: "images/products/equipamiento/monitor-paciente.webp",
        desc: "ECG, SpO2, NIBP, temperatura y más parámetros en tiempo real."
    },
    {
        id: 2,
        name: "Autoclave de Mesa Clase B",
        category: "Esterilización",
        brand: "NING-BO",
        img: "images/products/equipamiento/esterilizador.webp",
        desc: "Esterilización por vapor a alta presión para instrumental médico."
    },
    {
        id: 3,
        name: "Ecógrafo Portátil Digital",
        category: "Ultrasonido",
        brand: "EDAN",
        img: "images/products/equipamiento/ecografo.webp",
        desc: "Sistema de ultrasonido diagnóstico con sonda multifrecuencia."
    },
    {
        id: 4,
        name: "Desfibrilador Externo Automático (AED)",
        category: "Emergencia",
        brand: "Mindray",
        img: "images/products/equipamiento/desfibrilador.webp",
        desc: "Desfibrilador externo automático para respuesta rápida ante emergencias."
    },

    // --- MOBILIARIO MÉDICO ---
    {
        id: 10,
        name: "Cama Hospitalaria Eléctrica",
        category: "Mobiliario Médico",
        brand: "Salcedo",
        img: "images/products/mobiliario/cama-hospitalaria.webp",
        desc: "Cama con ajuste eléctrico de posiciones, barandas y frenos de seguridad."
    },
    {
        id: 11,
        name: "Camilla de Examen Clínico",
        category: "Mobiliario Médico",
        brand: "Salcedo",
        img: "images/products/mobiliario/camilla-examen.webp",
        desc: "Mesa de exploración ergonómica ajustable con tapizado de alta resistencia."
    }
];
