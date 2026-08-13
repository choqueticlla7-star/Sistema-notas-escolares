// ============================================
// SISTEMA DE CONSULTA DE CALIFICACIONES
// Archivo: admin.js
// Descripción: Lógica del panel administrativo
// Incluye: Gestión completa de estudiantes y notas
// ============================================

// Variables globales
let sesionIniciada = false;
let editandoEstudiante = false;
let listaEstudiantesFiltrada = [];

// Credenciales de acceso (en producción deberían estar en servidor)
const CREDENCIALES = {
    usuario: "admin",
    password: "admin2026"
};

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

function iniciarSesion(evento) {
    evento.preventDefault();
    
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    
    if (usuario === CREDENCIALES.usuario && password === CREDENCIALES.password) {
        sesionIniciada = true;
        localStorage.setItem('sesionAdmin', 'true');
        mostrarPanelAdmin();
        ocultarErrorLogin();
        
        // Limpiar formulario
        document.getElementById('usuario').value = '';
        document.getElementById('password').value = '';
        
        // Mostrar notificación
        mostrarNotificacion('✅ Sesión iniciada correctamente', 'exito');
    } else {
        mostrarErrorLogin('Usuario o contraseña incorrectos');
    }
}

function cerrarSesion() {
    sesionIniciada = false;
    editandoEstudiante = false;
    localStorage.removeItem('sesionAdmin');
    
    // Ocultar panel admin
    document.getElementById('seccionAdmin').style.display = 'none';
    document.getElementById('seccionLogin').style.display = 'flex';
    
    // Limpiar datos
    document.getElementById('usuario').value = '';
    document.getElementById('password').value = '';
    
    mostrarNotificacion('Sesión cerrada', 'info');
}

function mostrarPanelAdmin() {
    document.getElementById('seccionLogin').style.display = 'none';
    document.getElementById('seccionAdmin').style.display = 'block';
    
    // Cargar datos
    actualizarEstadisticas();
    cargarListaEstudiantes();
}

// ============================================
// FUNCIONES DE ESTADÍSTICAS
// ============================================

function actualizarEstadisticas() {
    const estadisticas = obtenerEstadisticas();
    
    document.getElementById('totalEstudiantes').textContent = estadisticas.totalEstudiantes;
    document.getElementById('promedioGeneral').textContent = estadisticas.promedioGeneral;
    document.getElementById('porcentajeAprobacion').textContent = estadisticas.porcentajeAprobacion + '%';
    document.getElementById('totalMaterias').textContent = obtenerMaterias().length;
}

// ============================================
// FUNCIONES DE LISTA DE ESTUDIANTES
// ============================================

function cargarListaEstudiantes() {
    const estudiantes = obtenerTodosEstudiantes();
    listaEstudiantesFiltrada = estudiantes;
    mostrarEstudiantesEnTabla(estudiantes);
}

function mostrarEstudiantesEnTabla(estudiantes) {
    const cuerpoTabla = document.getElementById('cuerpoTablaAdmin');
    cuerpoTabla.innerHTML = '';
    
    if (estudiantes.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem;">
                    No hay estudiantes registrados
                </td>
            </tr>
        `;
        return;
    }
    
    estudiantes.forEach(estudiante => {
        const promedio = calcularPromedioGeneral(estudiante);
        const colorPromedio = obtenerColorNota(promedio);
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${estudiante.codigo}</td>
            <td><strong>${estudiante.nombre}</strong></td>
            <td>${estudiante.paralelo}</td>
            <td>
                <span class="estado-nota" style="background-color: ${colorPromedio}; color: white;">
                    ${promedio}
                </span>
            </td>
            <td>${estudiante.asistencia}%</td>
            <td>
                <button class="boton-editar" onclick="editarEstudiante('${estudiante.codigo}')">
                    ✏️ Editar
                </button>
                <button class="boton-eliminar" onclick="eliminarEstudiante('${estudiante.codigo}')">
                    🗑️ Eliminar
                </button>
            </td>
        `;
        
        cuerpoTabla.appendChild(fila);
    });
}

function filtrarEstudiantes() {
    const busqueda = document.getElementById('busquedaAdmin').value.toLowerCase();
    
    if (busqueda === '') {
        listaEstudiantesFiltrada = obtenerTodosEstudiantes();
    } else {
        listaEstudiantesFiltrada = obtenerTodosEstudiantes().filter(estudiante => {
            return estudiante.nombre.toLowerCase().includes(busqueda) ||
                   estudiante.codigo.toLowerCase().includes(busqueda) ||
                   estudiante.paralelo.toLowerCase().includes(busqueda);
        });
    }
    
    mostrarEstudiantesEnTabla(listaEstudiantesFiltrada);
}

// ============================================
// FUNCIONES DE AGREGAR/EDITAR ESTUDIANTE
// ============================================

function mostrarAgregarEstudiante() {
    editandoEstudiante = false;
    
    // Actualizar título
    document.getElementById('tituloFormulario').textContent = 'Agregar Nuevo Estudiante';
    
    // Limpiar formulario
    document.getElementById('formularioEstudiante').reset();
    document.getElementById('codigoOriginal').value = '';
    
    // Generar código automático
    const nuevoCodigo = generarSiguienteCodigo();
    document.getElementById('codigoEstudiante').value = nuevoCodigo;
    
    // Mostrar formulario
    document.getElementById('formularioEdicion').style.display = 'block';
    
    // Scroll al formulario
    document.getElementById('formularioEdicion').scrollIntoView({ behavior: 'smooth' });
}

function editarEstudiante(codigo) {
    const estudiante = obtenerEstudiante(codigo);
    
    if (!estudiante) {
        mostrarNotificacion('Estudiante no encontrado', 'error');
        return;
    }
    
    editandoEstudiante = true;
    
    // Actualizar título
    document.getElementById('tituloFormulario').textContent = 'Editar Estudiante';
    
    // Llenar datos básicos
    document.getElementById('codigoOriginal').value = estudiante.codigo;
    document.getElementById('nombreCompleto').value = estudiante.nombre;
    document.getElementById('codigoEstudiante').value = estudiante.codigo;
    document.getElementById('paralelo').value = estudiante.paralelo;
    document.getElementById('asistencia').value = estudiante.asistencia;
    document.getElementById('observaciones').value = estudiante.observaciones || '';
    
    // Llenar notas de todas las materias
    const listaMaterias = obtenerMaterias();
    
    listaMaterias.forEach(materia => {
        const notas = estudiante.materias[materia];
        
        if (notas) {
            for (let i = 0; i < 3; i++) {
                const idInput = `nota_${materia}_${i + 1}`;
                const inputNota = document.getElementById(idInput);
                
                if (inputNota) {
                    inputNota.value = notas[i] || 0;
                }
            }
        }
    });
    
    // Mostrar formulario
    document.getElementById('formularioEdicion').style.display = 'block';
    
    // Scroll al formulario
    document.getElementById('formularioEdicion').scrollIntoView({ behavior: 'smooth' });
}

function guardarEstudiante(evento) {
    evento.preventDefault();
    
    const codigoOriginal = document.getElementById('codigoOriginal').value;
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const codigoEstudiante = document.getElementById('codigoEstudiante').value.trim();
    const paralelo = document.getElementById('paralelo').value;
    const asistencia = parseInt(document.getElementById('asistencia').value);
    const observaciones = document.getElementById('observaciones').value.trim();
    
    // Validaciones básicas
    if (!nombreCompleto || !codigoEstudiante || !paralelo || isNaN(asistencia)) {
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
        return;
    }
    
    if (asistencia < 0 || asistencia > 100) {
        mostrarNotificacion('La asistencia debe estar entre 0 y 100', 'error');
        return;
    }
    
    // Recopilar notas de todas las materias
    const materias = {};
    const listaMaterias = obtenerMaterias();
    
    for (let materia of listaMaterias) {
        const notas = [];
        
        for (let i = 1; i <= 3; i++) {
            const idInput = `nota_${materia}_${i}`;
            const inputNota = document.getElementById(idInput);
            
            if (inputNota) {
                const nota = parseInt(inputNota.value);
                
                if (isNaN(nota) || nota < 0 || nota > 100) {
                    mostrarNotificacion(`Nota inválida en ${materia}, trimestre ${i}`, 'error');
                    return;
                }
                
                notas.push(nota);
            } else {
                mostrarNotificacion(`Campo de nota no encontrado: ${materia}`, 'error');
                return;
            }
        }
        
        materias[materia] = notas;
    }
    
    const estudiantes = datosEstudiantes.estudiantes;
    
    if (editandoEstudiante) {
        // Editar estudiante existente
        const index = estudiantes.findIndex(e => e.codigo === codigoOriginal);
        
        if (index !== -1) {
            estudiantes[index].nombre = nombreCompleto;
            estudiantes[index].codigo = codigoEstudiante;
            estudiantes[index].paralelo = paralelo;
            estudiantes[index].asistencia = asistencia;
            estudiantes[index].observaciones = observaciones;
            estudiantes[index].materias = materias;
            
            mostrarNotificacion('✅ Estudiante actualizado correctamente', 'exito');
        }
    } else {
        // Verificar que el código no exista
        const existe = estudiantes.some(e => e.codigo === codigoEstudiante);
        
        if (existe) {
            mostrarNotificacion('El código ya existe', 'error');
            return;
        }
        
        // Agregar nuevo estudiante
        const nuevoEstudiante = {
            codigo: codigoEstudiante,
            nombre: nombreCompleto,
            curso: '3ro de Secundaria',
            paralelo: paralelo,
            materias: materias,
            asistencia: asistencia,
            observaciones: observaciones
        };
        
        estudiantes.push(nuevoEstudiante);
        mostrarNotificacion('✅ Estudiante agregado correctamente', 'exito');
    }
    
    // Ocultar formulario
    document.getElementById('formularioEdicion').style.display = 'none';
    
    // Actualizar lista y estadísticas
    actualizarEstadisticas();
    cargarListaEstudiantes();
}

function cancelarEdicion() {
    document.getElementById('formularioEdicion').style.display = 'none';
    editandoEstudiante = false;
}

function eliminarEstudiante(codigo) {
    const estudiante = obtenerEstudiante(codigo);
    
    if (!estudiante) return;
    
    const confirmacion = confirm(`¿Estás seguro de eliminar a ${estudiante.nombre}?`);
    
    if (confirmacion) {
        const index = datosEstudiantes.estudiantes.findIndex(e => e.codigo === codigo);
        
        if (index !== -1) {
            datosEstudiantes.estudiantes.splice(index, 1);
            mostrarNotificacion('✅ Estudiante eliminado', 'exito');
            actualizarEstadisticas();
            cargarListaEstudiantes();
        }
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function generarSiguienteCodigo() {
    const estudiantes = obtenerTodosEstudiantes();
    const ultimoNumero = estudiantes.length + 1;
    return `EST-2026-${String(ultimoNumero).padStart(3, '0')}`;
}

function exportarDatos() {
    const datos = {
        configuracion: datosEstudiantes.configuracion,
        estudiantes: datosEstudiantes.estudiantes,
        exportado: new Date().toISOString(),
        version: '1.0'
    };
    
    const datosJSON = JSON.stringify(datos, null, 2);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `respaldo_notas_${new Date().toISOString().split('T')[0]}.json`;
    enlace.click();
    
    URL.revokeObjectURL(url);
    
    mostrarNotificacion('📥 Datos exportados correctamente', 'exito');
}

// ============================================
// FUNCIONES DE ERROR Y NOTIFICACIONES
// ============================================

function mostrarErrorLogin(mensaje) {
    const mensajeError = document.getElementById('mensajeErrorLogin');
    const textoError = document.getElementById('textoErrorLogin');
    
    textoError.textContent = mensaje;
    mensajeError.style.display = 'flex';
    
    setTimeout(() => {
        mensajeError.style.display = 'none';
    }, 3000);
}

function ocultarErrorLogin() {
    document.getElementById('mensajeErrorLogin').style.display = 'none';
}

function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: aparecer 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
    `;
    
    // Color según tipo
    switch (tipo) {
        case 'exito':
            notificacion.style.backgroundColor = '#27AE60';
            break;
        case 'error':
            notificacion.style.backgroundColor = '#E74C3C';
            break;
        case 'info':
            notificacion.style.backgroundColor = '#3498DB';
            break;
        default:
            notificacion.style.backgroundColor = '#2C3E50';
    }
    
    // Agregar al body
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'desaparecer 0.3s ease';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// ============================================
// MODO OSCURO
// ============================================

function toggleModoOscuro() {
    const body = document.body;
    const boton = document.querySelector('.boton-modo-oscuro');
    
    body.classList.toggle('modo-oscuro');
    
    const modoOscuro = body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', modoOscuro);
    
    if (boton) {
        if (modoOscuro) {
            boton.innerHTML = '☀️ Modo Claro';
        } else {
            boton.innerHTML ='🌙 Modo Oscuro';
        }
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión guardada
    const sesionGuardada = localStorage.getItem('sesionAdmin');
    
    if (sesionGuardada === 'true') {
        sesionIniciada = true;
        mostrarPanelAdmin();
    }
    
    // Cargar preferencia de modo oscuro
    const modoOscuroGuardado = localStorage.getItem('modoOscuro');
    
    if (modoOscuroGuardado === 'true') {
        document.body.classList.add('modo-oscuro');
        const boton = document.querySelector('.boton-modo-oscuro');
        if (boton) {
            boton.innerHTML = '☀️ Modo Claro';
        }
    }
    
    // Enfocar campo de usuario
    const campoUsuario = document.getElementById('usuario');
    if (campoUsuario) {
        campoUsuario.focus();
    }
    
    console.log('Panel Administrativo cargado correctamente');
    console.log('Usuario por defecto: admin / admin2026');
});