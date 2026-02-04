let ventas = []; // Array para almacenar datos de ventas

// Cargar datos desde ventas.json
fetch('ventas.json')
    .then(response => response.json())
    .then(data => {
        ventas = data;
        mostrarNumeros(); // Mostrar lista de números al cargar
    })
    .catch(error => console.error('Error cargando ventas:', error));

// Función para mostrar números disponibles
function mostrarNumeros() {
    const lista = document.getElementById('listaNumeros');
    lista.innerHTML = '';
    for (let i = 1; i <= 250; i++) {
        const vendido = ventas.find(v => v.numero === i);
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = vendido ? 'numero-btn vendido' : 'numero-btn';
        if (!vendido) {
            btn.addEventListener('click', () => {
                // Redirigir a WhatsApp (cambia el número por el tuyo)
                const mensaje = encodeURIComponent(`Hola, quiero comprar el número ${i} del sorteo de moto.`);
                window.location.href = `https://wa.me/549123456789?text=${mensaje}`; // Reemplaza con tu número real
            });
        }
        lista.appendChild(btn);
    }
}

// Verificar número
document.getElementById('verificarBtn').addEventListener('click', function() {
    const num = parseInt(document.getElementById('numeroInput').value);
    const resultado = document.getElementById('resultadoVerif');
    if (num < 1 || num > 250) {
        resultado.textContent = 'Número inválido (1-250).';
        return;
    }
    const venta = ventas.find(v => v.numero === num);
    if (venta) {
        resultado.textContent = `Número ${num} vendido a: ${venta.nombre}`;
    } else {
        resultado.textContent = `Número ${num} disponible. ¡Elígelo arriba!`;
    }
});

// Simulador de sorteo
document.getElementById('sortearBtn').addEventListener('click', function() {
    const numeroSorteado = Math.floor(Math.random() * 250) + 1;
    document.getElementById('numero').textContent = numeroSorteado;
});
