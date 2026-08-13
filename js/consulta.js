// ============================================
// SISTEMA DE CONSULTA DE CALIFICACIONES
// Archivo: consulta.js
// Descripción: Lógica para consulta de notas
// ============================================

// Variables globales
let estudianteActual = null;
let campoFiltrado = null;

// ============================================
// FUNCIÓN PRINCIPAL DE BÚSQUEDA
// ============================================

function buscarEstudiante(evento) {
    // Prevenir que el formulario se envíe
    evento.preventDefault();
    
    // Obtener el código ingresado
    const codigoIngresado = document.getElementById('codigoEstudiante').value.trim();
    
    // Validar que no esté vacío
    if (codigoIngresado === '') {
        mostrarError('Por favor, ingresa un código estudiantil');
        return;
    }
    
    // Buscar el estudiante
    const estudiante = obtenerEstudiante(codigoIngresado);
    
    if (estudiante) {
        // Guardar estudiante actual
        estudianteActual = estudiante;
        campoFiltrado = null;
        
        // Mostrar resultados
        mostrarResultados(estudiante);
        
        // Ocultar errores
        ocultarError();
        
        // Limpiar campo de búsqueda
        document.getElementById('codigoEstudiante').value = '';
    } else {
        mostrarError('Código no encontrado. Verifica e intenta nuevamente.');
    }
}

// ============================================
// FUNCIONES DE VISUALIZACIÓN
// ============================================

function mostrarResultados(estudiante) {
    // Mostrar sección de resultados
    document.getElementById('seccionConsulta').style.display = 'none';
    document.getElementById('seccionResultados').style.display = 'block';
    
    // Actualizar información del estudiante
    actualizarInfoEstudiante(estudiante);
    
    // Mostrar todas las materias
    mostrarTodasMaterias();
    
    // Hacer scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function actualizarInfoEstudiante(estudiante) {
    // Datos básicos
    document.getElementById('nombreEstudiante').textContent = estudiante.nombre;
    document.getElementById('codigoMostrado').textContent = estudiante.codigo;
    document.getElementById('cursoMostrado').textContent = estudiante.curso;
    document.getElementById('paraleloMostrado').textContent = estudiante.paralelo;
    
    // Promedio general
    const promedio = calcularPromedioGeneral(estudiante);
    document.getElementById('promedioGeneral').textContent = promedio;
    
    // Estado del promedio
    const estado = obtenerEstado(promedio);
    const estadoPromedio = document.getElementById('estadoPromedio');
    estadoPromedio.textContent = estado;
    estadoPromedio.style.backgroundColor = obtenerColorNota(promedio);
    
    // Asistencia
    document.getElementById('porcentajeAsistencia').textContent = estudiante.asistencia + '%';
    document.getElementById('barraAsistencia').style.width = estudiante.asistencia + '%';
    
    // Color de barra de asistencia
    const barraAsistencia = document.getElementById('barraAsistencia');
    if (estudiante.asistencia >= 90) {
        barraAsistencia.style.backgroundColor = '#27AE60';
    } else if (estudiante.asistencia >= 80) {
        barraAsistencia.style.backgroundColor = '#F1C40F';
    } else {
        barraAsistencia.style.backgroundColor = '#E74C3C';
    }
    
    // Observaciones
    document.getElementById('observacionesEstudiante').textContent = 
        estudiante.observaciones || 'Sin observaciones';
}

function mostrarTodasMaterias() {
    campoFiltrado = null;
    
    // Resetear botones de filtro
    const botones = document.querySelectorAll('.botones-filtro button');
    botones.forEach((boton, index) => {
        if (index === 0) {
            boton.classList.add('filtro-activo');
        } else {
            boton.classList.remove('filtro-activo');
        }
    });
    
    // Mostrar todas las materias
    const materias = obtenerMaterias();
    llenarTablaNotas(materias);
}

function filtrarPorCampo(campo) {
    campoFiltrado = campo;
    
    // Actualizar botones de filtro
    const botones = document.querySelectorAll('.botones-filtro button');
    botones.forEach(boton => {
        boton.classList.remove('filtro-activo');
    });
    
    // Encontrar y activar el botón correcto
    botones.forEach(boton => {
        if (boton.textContent.trim() === campo) {
            boton.classList.add('filtro-activo');
        }
    });
    
    // Obtener materias del campo seleccionado
    const materias = obtenerMateriasPorCampo(campo);
    llenarTablaNotas(materias);
}

function llenarTablaNotas(materias) {
    const cuerpoTabla = document.getElementById('cuerpoTablaNotas');
    cuerpoTabla.innerHTML = '';
    
    if (!estudianteActual) return;
    
    materias.forEach(materia => {
        const notas = estudianteActual.materias[materia];
        if (!notas) return;
        
        const promedio = calcularPromedioMateria(estudianteActual, materia);
        const estado = obtenerEstado(promedio);
        const colorEstado = obtenerColorNota(promedio);
        
        // Encontrar el campo al que pertenece la materia
        const campo = encontrarCampoDeMateria(materia);
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${campo}</td>
            <td><strong>${materia}</strong></td>
            <td>${notas[0]}</td>
            <td>${notas[1]}</td>
            <td>${notas[2]}</td>
            <td class="nota-final">${promedio}</td>
            <td>
                <span class="estado-nota" style="background-color: ${colorEstado}; color: white;">
                    ${estado}
                </span>
            </td>
        `;
        
        cuerpoTabla.appendChild(fila);
    });
}

function encontrarCampoDeMateria(materiaBuscada) {
    const campos = datosEstudiantes.configuracion.materias;
    
    for (let campo in campos) {
        if (campos[campo].includes(materiaBuscada)) {
            return campo;
        }
    }
    
    return 'Sin Campo';
}

// ============================================
// FUNCIONES DE ERROR
// ============================================

function mostrarError(mensaje) {
    const mensajeError = document.getElementById('mensajeError');
    const textoError = document.getElementById('textoError');
    
    textoError.textContent = mensaje;
    mensajeError.style.display = 'flex';
    
    // Animar el error
    mensajeError.style.animation = 'none';
    setTimeout(() => {
        mensajeError.style.animation = 'aparecer 0.3s ease';
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        ocultarError();
    }, 3000);
}

function ocultarError() {
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.style.display = 'none';
}

// ============================================
// FUNCIONES DE NAVEGACIÓN
// ============================================

function nuevaConsulta() {
    // Ocultar resultados
    document.getElementById('seccionResultados').style.display = 'none';
    document.getElementById('seccionConsulta').style.display = 'flex';
    
    // Limpiar datos
    estudianteActual = null;
    campoFiltrado = null;
    
    // Enfocar el campo de búsqueda
    document.getElementById('codigoEstudiante').focus();
    
    // Scroll arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function imprimirBoletin() {
    window.print();
}

// ============================================
// MODO OSCURO
// ============================================

function toggleModoOscuro() {
    const body = document.body;
    const boton = document.getElementById('botonModoOscuro');
    
    body.classList.toggle('modo-oscuro');
    
    // Guardar preferencia
    const modoOscuro = body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', modoOscuro);
    
    // Actualizar texto del botón
    if (modoOscuro) {
        boton.innerHTML = '☀️ Modo Claro';
    } else {
        boton.innerHTML = '🌙 Modo Oscuro';
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Cargar preferencia de modo oscuro
    const modoOscuroGuardado = localStorage.getItem('modoOscuro');
    
    if (modoOscuroGuardado === 'true') {
        document.body.classList.add('modo-oscuro');
        document.getElementById('botonModoOscuro').innerHTML = '☀️ Modo Claro';
    }
    
    // Enfocar campo de búsqueda
    document.getElementById('codigoEstudiante').focus();
    
    // Agregar atajo de teclado (Enter para buscar)
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape' && estudianteActual) {
            nuevaConsulta();
        }
    });
    
    console.log('Sistema de Consulta de Calificaciones iniciado correctamente');
    console.log('Unidad Educativa Simón Bolívar - Gestión 2026');
});

// ============================================
// FUNCIONES ADICIONALES
// ============================================

// Función para validar formato del código
function validarFormatoCodigo(codigo) {
    const formato = /^EST-\d{4}-\d{3}$/;
    return formato.test(codigo);
}

// Función para sugerir códigos mientras escribe
function sugerirCodigos(texto) {
    if (texto.length < 3) return [];
    
    const sugerencias = [];
    const estudiantes = obtenerTodosEstudiantes();
    
    estudiantes.forEach(estudiante => {
        if (estudiante.codigo.toLowerCase().includes(texto.toLowerCase()) ||
            estudiante.nombre.toLowerCase().includes(texto.toLowerCase())) {
            sugerencias.push({
                codigo: estudiante.codigo,
                nombre: estudiante.nombre
            });
        }
    });
    
    return sugerencias;
}

// Función para mostrar estadísticas rápidas
function mostrarEstadisticasRapidas() {
    const stats = obtenerEstadisticas();
    
    console.log('=== ESTADÍSTICAS DEL CURSO ===');
    console.log('Total Estudiantes:', stats.totalEstudiantes);
    console.log('Promedio General:', stats.promedioGeneral);
    console.log('Aprobados:', stats.totalAprobados);
    console.log('Reprobados:', stats.totalReprobados);
    console.log('Porcentaje Aprobación:', stats.porcentajeAprobacion + '%');
}