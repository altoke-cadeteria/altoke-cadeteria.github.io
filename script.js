

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
        btn.className = vendido ? 'numero-btn vendido' : 'numero-btn';
        if (vendido) {
            btn.textContent = `Número ${i} - Vendido a ${vendido.nombre}`;
        } else {
            btn.textContent = `Número ${i}`;
            btn.addEventListener('click', () => {
                // Redirigir a WhatsApp
                const mensaje = encodeURIComponent(`Hola, quiero comprar el número ${i} del sorteo de moto.`);
                window.location.href = `https://wa.me/5493515160210?text=${mensaje}`;
            });
        }
        lista.appendChild(btn);
    }
}

// Simulador de sorteo con animación
document.getElementById('sortearBtn').addEventListener('click', function() {
    const resultadoSpan = document.getElementById('numero');
    let contador = 0;
    const intervalo = setInterval(() => {
        const numTemp = Math.floor(Math.random() * 250) + 1;
        resultadoSpan.textContent = numTemp;
        contador++;
        if (contador > 30) { // Animación de ~3 segundos (30 iteraciones)
            clearInterval(intervalo);
            const numeroSorteado = Math.floor(Math.random() * 250) + 1;
            resultadoSpan.textContent = numeroSorteado;
        }
    }, 100); // Cambia cada 100ms
});
