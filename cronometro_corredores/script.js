let corredores = [];
let tiempos = {};
let inicioTiempo = null;
let cronometroIniciado = false;
let intervalo = null;

// Función para actualizar el cronómetro
function actualizarCronometro() {
    if (cronometroIniciado) {
        const tiempoTranscurrido = Date.now() - inicioTiempo;
        const horas = Math.floor(tiempoTranscurrido / 3600000);
        const minutos = Math.floor((tiempoTranscurrido % 3600000) / 60000);
        const segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
        document.getElementById('cronometro').textContent =
            `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }
}

// Registrar el número de corredores
document.getElementById('confirmarCorredores').addEventListener('click', () => {
    const numCorredores = parseInt(document.getElementById('numCorredores').value);
    if (isNaN(numCorredores) || numCorredores < 1) {
        alert('Por favor, ingrese un número válido de corredores.');
        return;
    }

    // Limpiar listas anteriores
    corredores = [];
    tiempos = {};
    const listaCorredores = document.getElementById('listaCorredores');
    listaCorredores.innerHTML = '';

    // Crear corredores
    for (let i = 1; i <= numCorredores; i++) {
        const nombre = `Corredor ${i}`;
        corredores.push(nombre);
        tiempos[nombre] = [];
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        listaCorredores.appendChild(option);
    }

    alert(`${numCorredores} corredores registrados.`);
});

// Iniciar el cronómetro
document.getElementById('iniciarCronometro').addEventListener('click', () => {
    if (!cronometroIniciado) {
        cronometroIniciado = true;
        inicioTiempo = Date.now();
        intervalo = setInterval(actualizarCronometro, 1000);
        alert('Cronómetro iniciado.');
    }
});

// Registrar tiempo para un corredor
document.getElementById('registrarTiempo').addEventListener('click', () => {
    const corredorSeleccionado = document.getElementById('listaCorredores').value;
    if (!corredorSeleccionado) {
        alert('Seleccione un corredor para registrar el tiempo.');
        return;
    }

    if (cronometroIniciado) {
        const tiempoActual = (Date.now() - inicioTiempo) / 1000; // Tiempo en segundos
        tiempos[corredorSeleccionado].push(tiempoActual);
        alert(`Tiempo registrado para ${corredorSeleccionado}: ${tiempoActual.toFixed(2)} segundos.`);
    } else {
        alert('El cronómetro no ha sido iniciado.');
    }
});

// Finalizar la carrera
document.getElementById('finalizarCarrera').addEventListener('click', () => {
    if (cronometroIniciado) {
        clearInterval(intervalo);
        cronometroIniciado = false;
        alert('Carrera finalizada. Mostrando resultados...');
        mostrarResultados();
    } else {
        alert('El cronómetro no ha sido iniciado.');
    }
});

// Mostrar resultados
function mostrarResultados() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '<h3>Resultados:</h3>';

    for (const [corredor, tiemposCorredor] of Object.entries(tiempos)) {
        resultadosDiv.innerHTML += `<p><strong>${corredor}:</strong></p>`;
        tiemposCorredor.forEach((tiempo, index) => {
            resultadosDiv.innerHTML += `<p>Vuelta ${index + 1}: ${tiempo.toFixed(2)} segundos</p>`;
        });
    }
}