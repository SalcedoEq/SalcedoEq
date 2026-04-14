// Base de datos de productos - Salcedo Equipment
// Solo añadir o remover objetos de esta lista.
window.SalcedoProducts = [
    // --- EQUIPAMIENTO MÉDICO (PRINCIPALES) ---
    { 
        id: 1, 
        name: "Monitor de Paciente Multiparámetros", 
        category: "Monitores", 
        subcategory: "Multiparámetros", 
        globalType: "Equipamiento", 
        brand: "Mindray", 
        price: 1500, 
        img: "images/products/equipamiento/monitor-paciente.png",
        desc: "ECG, SpO2, NIBP, temperatura y más parámetros en tiempo real." 
    },
    { 
        id: 2, 
        name: "Autoclave de Mesa Clase B", 
        category: "Esterilización", 
        subcategory: "Autoclaves", 
        globalType: "Equipamiento", 
        brand: "NING-BO", 
        price: 3500, 
        img: "images/products/equipamiento/esterilizador.png",
        desc: "Esterilización por vapor a alta presión para instrumental médico." 
    },
    { 
        id: 3, 
        name: "Ecógrafo Portátil Digital", 
        category: "Ultrasonido", 
        subcategory: "Doppler", 
        globalType: "Equipamiento", 
        brand: "EDAN", 
        price: 4200, 
        img: "images/products/equipamiento/ecografo.png",
        desc: "Sistema de ultrasonido diagnóstico con sonda multifrecuencia." 
    },
    { 
        id: 4, 
        name: "Desfibrilador Externo Automático (AED)", 
        category: "Emergencia", 
        subcategory: "Desfibriladores", 
        globalType: "Equipamiento", 
        brand: "Mindray", 
        price: 2800, 
        img: "images/products/equipamiento/desfibrilador.png",
        desc: "Desfibrilador externo automático para respuesta rápida ante emergencias." 
    },

    // --- MOBILIARIO MÉDICO (PRINCIPALES) ---
    { 
        id: 10, 
        name: "Cama Hospitalaria Eléctrica", 
        category: "Mobiliario Médico", 
        subcategory: "Camas", 
        globalType: "Mobiliario", 
        brand: "Salcedo", 
        price: 3200, 
        img: "images/products/mobiliario/cama-hospitalaria.png",
        desc: "Cama con ajuste eléctrico de posiciones, barandas y frenos de seguridad." 
    },
    { 
        id: 11, 
        name: "Camilla de Examen Clínico", 
        category: "Mobiliario Médico", 
        subcategory: "Camillas", 
        globalType: "Mobiliario", 
        brand: "Salcedo", 
        price: 850, 
        img: "images/products/mobiliario/camilla-examen.png",
        desc: "Mesa de exploración ergonómica ajustable con tapizado de alta resistencia." 
    },

    // --- EQUIPAMIENTO ADICIONAL (VARIEDAD) ---
    { id: 5, name: "Foco Quirúrgico LED Pro", category: "Iluminación", subcategory: "Lámparas", globalType: "Equipamiento", brand: "Siemens", price: 4500, img: "images/products/equipamiento/esterilizador.png", desc: "Iluminación sin sombras para procedimientos quirúrgicos." },
    { id: 6, name: "Monitor Serie B Pro", category: "Monitores", subcategory: "Multiparámetros", globalType: "Equipamiento", brand: "Dragüer", price: 2100, img: "images/products/equipamiento/monitor-paciente.png", desc: "Monitoreo avanzado con conectividad integrada." },
    { id: 7, name: "Monitor Fetal F3", category: "Monitores", subcategory: "Fetales", globalType: "Equipamiento", brand: "EDAN", price: 1200, img: "images/products/equipamiento/monitor-paciente.png", desc: "Monitoreo fetal de alta sensibilidad." },
    { id: 8, name: "Monitor Fetal F6 Duo", category: "Monitores", subcategory: "Fetales", globalType: "Equipamiento", brand: "EDAN", price: 1800, img: "images/products/equipamiento/monitor-paciente.png", desc: "Monitoreo gemelar avanzado." },
    { id: 9, name: "Bomba de Infusión Volumétrica", category: "Emergencia", subcategory: "Infusión", globalType: "Equipamiento", brand: "Mindray", price: 950, img: "images/products/equipamiento/monitor-paciente.png", desc: "Control preciso de fluidos." },
    { id: 12, name: "Ecógrafo Doppler Color", category: "Ultrasonido", subcategory: "Doppler", globalType: "Equipamiento", brand: "Siemens", price: 5800, img: "images/products/equipamiento/ecografo.png", desc: "Diagnóstico vascular avanzado." },
    { id: 13, name: "Autoclave de 50L Horizontal", category: "Esterilización", subcategory: "Autoclaves", globalType: "Equipamiento", brand: "NING-BO", price: 6200, img: "images/products/equipamiento/esterilizador.png", desc: "Gran capacidad para centros quirúrgicos." },
    { id: 14, name: "Oxímetro de Pulso Profesional", category: "Monitores", subcategory: "Portátiles", globalType: "Equipamiento", brand: "Otros", price: 120, img: "images/products/equipamiento/monitor-paciente.png", desc: "Lectura rápida y precisa de saturación." },
    
    // --- MOBILIARIO ADICIONAL ---
    { id: 15, name: "Silla de Ruedas Clínica", category: "Mobiliario Médico", subcategory: "Traslado", globalType: "Mobiliario", brand: "Otros", price: 350, img: "images/products/mobiliario/camilla-examen.png", desc: "Estructura reforzada y plegable." },
    { id: 16, name: "Escalinata de 2 Peldaños", category: "Mobiliario Médico", subcategory: "Accesorios", globalType: "Mobiliario", brand: "Salcedo", price: 80, img: "images/products/mobiliario/camilla-examen.png", desc: "Acero inoxidable calidad 304." },
    { id: 17, name: "Vitrina porta instrumentos", category: "Mobiliario Médico", subcategory: "Gabinete", globalType: "Mobiliario", brand: "Salcedo", price: 1100, img: "images/products/mobiliario/camilla-examen.png", desc: "Puertas de vidrio templado y cerradura." },
    { id: 18, name: "Porta Suero de 4 Ganchos", category: "Mobiliario Médico", subcategory: "Accesorios", globalType: "Mobiliario", brand: "Salcedo", price: 150, img: "images/products/mobiliario/camilla-examen.png", desc: "Base de 5 puntas con ruedas." },

    // --- RELLENO PARA PAGINACIÓN (30+ EQUIPOS) ---
    ...Array.from({ length: 25 }, (_, i) => ({
        id: 20 + i,
        name: `Equipo de Diagnóstico Mod. ${100 + i}`,
        category: i % 2 === 0 ? "Diagnóstico" : "Esterilización",
        subcategory: "General",
        globalType: "Equipamiento",
        brand: i % 3 === 0 ? "Mindray" : "Siemens",
        price: 500 + (i * 10),
        img: "images/products/equipamiento/monitor-paciente.png",
        desc: "Equipo de alta precisión diseñado para durabilidad y eficiencia clínica."
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        id: 50 + i,
        name: `Mueble Clínico Serie ${String.fromCharCode(65 + i)}`,
        category: "Mobiliario Médico",
        subcategory: "General",
        globalType: "Mobiliario",
        brand: "Salcedo",
        price: 300 + (i * 20),
        img: "images/products/mobiliario/camilla-examen.png",
        desc: "Mobiliario hospitalario de alta calidad fabricado bajo normas internacionales."
    }))
];
