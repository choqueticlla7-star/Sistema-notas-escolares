// ============================================
// SISTEMA DE CONSULTA DE CALIFICACIONES
// UNIDADES EDUCATIVAS BOLIVIANAS
// Archivo: datos.js
// Descripción: Base de datos con estructura del
// Sistema Educativo Boliviano - Gestión 2026
// ============================================

const datosEstudiantes = {
    configuracion: {
        ministerio: "Ministerio de Educación",
        departamento: "La Paz",
        colegio: "Unidad Educativa Simón Bolívar",
        nivel: "Secundaria Comunitaria Productiva",
        curso: "3ro de Secundaria",
        paralelo: "A",
        gestion: "2026",
        escala: "1-100",
        trimestres: ["Primer Trimestre", "Segundo Trimestre", "Tercer Trimestre"],
        
        // Campos de saberes del currículo boliviano
        campos: [
            "Comunidad y Sociedad",
            "Vida, Tierra y Territorio",
            "Ciencia, Tecnología y Producción",
            "Cosmos y Pensamiento"
        ],
        
        // Materias organizadas por campos
        materias: {
            "Comunidad y Sociedad": [
                "Comunicación y Lenguajes",
                "Lengua Originaria (Aymara)",
                "Ciencias Sociales",
                "Educación Física y Deportes",
                "Educación Musical",
                "Artes Plásticas y Visuales"
            ],
            "Vida, Tierra y Territorio": [
                "Matemática",
                "Biología",
                "Física",
                "Química"
            ],
            "Ciencia, Tecnología y Producción": [
                "Técnica Tecnológica General",
                "Computación e Informática"
            ],
            "Cosmos y Pensamiento": [
                "Cosmovisiones y Filosofía",
                "Valores, Espiritualidad y Religiones"
            ]
        }
    },
    
    estudiantes: [
        {
            codigo: "EST-2026-001",
            nombre: "Ana María Pérez González",
            curso: "3ro de Secundaria",
            paralelo: "A",
            materias: {
                "Comunicación y Lenguajes": [85, 88, 90],
                "Lengua Originaria (Aymara)": [80, 82, 85],
                "Ciencias Sociales": [75, 80, 85],
                "Educación Física y Deportes": [90, 92, 95],
                "Educación Musical": [85, 88, 90],
                "Artes Plásticas y Visuales": [88, 90, 92],
                "Matemática": [78, 82, 85],
                "Biología": [82, 85, 88],
                "Física": [75, 78, 80],
                "Química": [80, 82, 85],
                "Técnica Tecnológica General": [85, 88, 90],
                "Computación e Informática": [90, 92, 95],
                "Cosmovisiones y Filosofía": [82, 85, 88],
                "Valores, Espiritualidad y Religiones": [88, 90, 92]
            },
            asistencia: 92,
            observaciones: "Excelente desempeño académico"
        },
        {
            codigo: "EST-2026-002",
            nombre: "Juan Carlos Díaz Rojas",
            curso: "3ro de Secundaria",
            paralelo: "A",
            materias: {
                "Comunicación y Lenguajes": [75, 78, 80],
                "Lengua Originaria (Aymara)": [70, 72, 75],
                "Ciencias Sociales": [78, 80, 82],
                "Educación Física y Deportes": [88, 90, 92],
                "Educación Musical": [72, 75, 78],
                "Artes Plásticas y Visuales": [70, 72, 75],
                "Matemática": [65, 68, 70],
                "Biología": [72, 75, 78],
                "Física": [68, 70, 72],
                "Química": [70, 72, 75],
                "Técnica Tecnológica General": [75, 78, 80],
                "Computación e Informática": [78, 80, 82],
                "Cosmovisiones y Filosofía": [75, 78, 80],
                "Valores, Espiritualidad y Religiones": [80, 82, 85]
            },
            asistencia: 85,
            observaciones: "Mejorar en Matemática y Física"
        },
        {
            codigo: "EST-2026-003",
            nombre: "Luisa Fernanda Reyes",
            curso: "3ro de Secundaria",
            paralelo: "A",
            materias: {
                "Comunicación y Lenguajes": [92, 94, 95],
                "Lengua Originaria (Aymara)": [85, 88, 90],
                "Ciencias Sociales": [88, 90, 92],
                "Educación Física y Deportes": [85, 88, 90],
                "Educación Musical": [90, 92, 94],
                "Artes Plásticas y Visuales": [92, 94, 95],
                "Matemática": [88, 90, 92],
                "Biología": [90, 92, 94],
                "Física": [85, 88, 90],
                "Química": [88, 90, 92],
                "Técnica Tecnológica General": [90, 92, 94],
                "Computación e Informática": [95, 96, 97],
                "Cosmovisiones y Filosofía": [88, 90, 92],
                "Valores, Espiritualidad y Religiones": [92, 94, 95]
            },
            asistencia: 96,
            observaciones: "Sobresaliente en todas las áreas"
        },
        {
            codigo: "EST-2026-004",
            nombre: "Pedro Pablo Mamani Quispe",
            curso: "3ro de Secundaria",
            paralelo: "B",
            materias: {
                "Comunicación y Lenguajes": [70, 72, 75],
                "Lengua Originaria (Aymara)": [85, 88, 90],
                "Ciencias Sociales": [72, 75, 78],
                "Educación Física y Deportes": [92, 94, 95],
                "Educación Musical": [68, 70, 72],
                "Artes Plásticas y Visuales": [65, 68, 70],
                "Matemática": [75, 78, 80],
                "Biología": [78, 80, 82],
                "Física": [70, 72, 75],
                "Química": [72, 75, 78],
                "Técnica Tecnológica General": [78, 80, 82],
                "Computación e Informática": [72, 75, 78],
                "Cosmovisiones y Filosofía": [75, 78, 80],
                "Valores, Espiritualidad y Religiones": [78, 80, 82]
            },
            asistencia: 88,
            observaciones: "Destacado en Educación Física"
        },
        {
            codigo: "EST-2026-005",
            nombre: "María José Choque Condori",
            curso: "3ro de Secundaria",
            paralelo: "B",
            materias: {
                "Comunicación y Lenguajes": [88, 90, 92],
                "Lengua Originaria (Aymara)": [90, 92, 94],
                "Ciencias Sociales": [85, 88, 90],
                "Educación Física y Deportes": [80, 82, 85],
                "Educación Musical": [85, 88, 90],
                "Artes Plásticas y Visuales": [90, 92, 94],
                "Matemática": [82, 85, 88],
                "Biología": [85, 88, 90],
                "Física": [78, 80, 82],
                "Química": [80, 82, 85],
                "Técnica Tecnológica General": [85, 88, 90],
                "Computación e Informática": [88, 90, 92],
                "Cosmovisiones y Filosofía": [85, 88, 90],
                "Valores, Espiritualidad y Religiones": [90, 92, 94]
            },
            asistencia: 90,
            observaciones: "Muy buen desempeño general"
        },
        {
            codigo: "EST-2026-006",
            nombre: "Carlos Andrés Quispe Laura",
            curso: "3ro de Secundaria",
            paralelo: "B",
            materias: {
                "Comunicación y Lenguajes": [78, 80, 82],
                "Lengua Originaria (Aymara)": [75, 78, 80],
                "Ciencias Sociales": [70, 72, 75],
                "Educación Física y Deportes": [85, 88, 90],
                "Educación Musical": [72, 75, 78],
                "Artes Plásticas y Visuales": [68, 70, 72],
                "Matemática": [90, 92, 94],
                "Biología": [85, 88, 90],
                "Física": [82, 85, 88],
                "Química": [80, 82, 85],
                "Técnica Tecnológica General": [85, 88, 90],
                "Computación e Informática": [92, 94, 95],
                "Cosmovisiones y Filosofía": [75, 78, 80],
                "Valores, Espiritualidad y Religiones": [78, 80, 82]
            },
            asistencia: 82,
            observaciones: "Excelente en Matemática y Computación"
        },
        {
            codigo: "EST-2026-007",
            nombre: "Sofía Alejandra Vargas Nina",
            curso: "3ro de Secundaria",
            paralelo: "C",
            materias: {
                "Comunicación y Lenguajes": [90, 92, 94],
                "Lengua Originaria (Aymara)": [82, 85, 88],
                "Ciencias Sociales": [88, 90, 92],
                "Educación Física y Deportes": [75, 78, 80],
                "Educación Musical": [85, 88, 90],
                "Artes Plásticas y Visuales": [88, 90, 92],
                "Matemática": [78, 80, 82],
                "Biología": [80, 82, 85],
                "Física": [72, 75, 78],
                "Química": [78, 80, 82],
                "Técnica Tecnológica General": [82, 85, 88],
                "Computación e Informática": [85, 88, 90],
                "Cosmovisiones y Filosofía": [88, 90, 92],
                "Valores, Espiritualidad y Religiones": [85, 88, 90]
            },
            asistencia: 87,
            observaciones: "Destacada en humanidades"
        },
        {
            codigo: "EST-2026-008",
            nombre: "Jorge Luis Condori Apaza",
            curso: "3ro de Secundaria",
            paralelo: "C",
            materias: {
                "Comunicación y Lenguajes": [72, 75, 78],
                "Lengua Originaria (Aymara)": [80, 82, 85],
                "Ciencias Sociales": [75, 78, 80],
                "Educación Física y Deportes": [90, 92, 94],
                "Educación Musical": [70, 72, 75],
                "Artes Plásticas y Visuales": [68, 70, 72],
                "Matemática": [80, 82, 85],
                "Biología": [75, 78, 80],
                "Física": [72, 75, 78],
                "Química": [75, 78, 80],
                "Técnica Tecnológica General": [80, 82, 85],
                "Computación e Informática": [75, 78, 80],
                "Cosmovisiones y Filosofía": [72, 75, 78],
                "Valores, Espiritualidad y Religiones": [75, 78, 80]
            },
            asistencia: 80,
            observaciones: "Necesita mejorar en Inglés"
        },
        {
            codigo: "EST-2026-009",
            nombre: "Camila Andrea Flores Ticona",
            curso: "3ro de Secundaria",
            paralelo: "C",
            materias: {
                "Comunicación y Lenguajes": [94, 95, 96],
                "Lengua Originaria (Aymara)": [88, 90, 92],
                "Ciencias Sociales": [92, 94, 95],
                "Educación Física y Deportes": [85, 88, 90],
                "Educación Musical": [92, 94, 95],
                "Artes Plásticas y Visuales": [94, 95, 96],
                "Matemática": [90, 92, 94],
                "Biología": [92, 94, 95],
                "Física": [88, 90, 92],
                "Química": [90, 92, 94],
                "Técnica Tecnológica General": [92, 94, 95],
                "Computación e Informática": [96, 97, 98],
                "Cosmovisiones y Filosofía": [90, 92, 94],
                "Valores, Espiritualidad y Religiones": [94, 95, 96]
            },
            asistencia: 98,
            observaciones: "Mejor promedio del curso"
        },
        {
            codigo: "EST-2026-010",
            nombre: "Diego Fernando Huanca Mamani",
            curso: "3ro de Secundaria",
            paralelo: "C",
            materias: {
                "Comunicación y Lenguajes": [65, 68, 70],
                "Lengua Originaria (Aymara)": [70, 72, 75],
                "Ciencias Sociales": [68, 70, 72],
                "Educación Física y Deportes": [82, 85, 88],
                "Educación Musical": [65, 68, 70],
                "Artes Plásticas y Visuales": [62, 65, 68],
                "Matemática": [68, 70, 72],
                "Biología": [70, 72, 75],
                "Física": [60, 62, 65],
                "Química": [65, 68, 70],
                "Técnica Tecnológica General": [70, 72, 75],
                "Computación e Informática": [68, 70, 72],
                "Cosmovisiones y Filosofía": [65, 68, 70],
                "Valores, Espiritualidad y Religiones": [70, 72, 75]
            },
            asistencia: 75,
            observaciones: "Requiere apoyo académico"
        }
    ]
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Función para obtener un estudiante por código
function obtenerEstudiante(codigo) {
    return datosEstudiantes.estudiantes.find(
        estudiante => estudiante.codigo === codigo
    );
}

// Función para obtener todas las materias
function obtenerMaterias() {
    const materias = [];
    const campos = datosEstudiantes.configuracion.materias;
    
    for (let campo in campos) {
        campos[campo].forEach(materia => {
            materias.push(materia);
        });
    }
    
    return materias;
}

// Función para obtener materias por campo
function obtenerMateriasPorCampo(campo) {
    return datosEstudiantes.configuracion.materias[campo] || [];
}

// Función para calcular promedio de una materia
function calcularPromedioMateria(estudiante, materia) {
    const notas = estudiante.materias[materia];
    if (!notas) return 0;
    
    const suma = notas.reduce((total, nota) => total + nota, 0);
    return Math.round(suma / notas.length);
}

// Función para calcular promedio general del estudiante
function calcularPromedioGeneral(estudiante) {
    let sumaTotal = 0;
    let cantidadMaterias = 0;
    
    for (let materia in estudiante.materias) {
        const promedio = calcularPromedioMateria(estudiante, materia);
        sumaTotal += promedio;
        cantidadMaterias++;
    }
    
    return Math.round(sumaTotal / cantidadMaterias);
}

// Función para obtener estado según nota
function obtenerEstado(nota) {
    if (nota >= 91) return "Excelente";
    if (nota >= 81) return "Muy Bueno";
    if (nota >= 71) return "Bueno";
    if (nota >= 61) return "Regular";
    if (nota >= 51) return "En Proceso";
    return "Reprobado";
}

// Función para obtener color según nota
function obtenerColorNota(nota) {
    if (nota >= 91) return "#27AE60"; // Verde excelente
    if (nota >= 81) return "#2ECC71"; // Verde bueno
    if (nota >= 71) return "#F1C40F"; // Amarillo
    if (nota >= 61) return "#E67E22"; // Naranja
    if (nota >= 51) return "#E74C3C"; // Rojo claro
    return "#C0392B"; // Rojo oscuro
}

// Función para obtener todos los estudiantes
function obtenerTodosEstudiantes() {
    return datosEstudiantes.estudiantes;
}

// Función para obtener estadísticas generales
function obtenerEstadisticas() {
    const estudiantes = datosEstudiantes.estudiantes;
    const total = estudiantes.length;
    let sumaPromedios = 0;
    let aprobados = 0;
    let reprobados = 0;
    
    estudiantes.forEach(estudiante => {
        const promedio = calcularPromedioGeneral(estudiante);
        sumaPromedios += promedio;
        
        if (promedio >= 51) {
            aprobados++;
        } else {
            reprobados++;
        }
    });
    
    return {
        totalEstudiantes: total,
        promedioGeneral: Math.round(sumaPromedios / total),
        totalAprobados: aprobados,
        totalReprobados: reprobados,
        porcentajeAprobacion: Math.round((aprobados / total) * 100)
    };
}