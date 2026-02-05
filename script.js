// Datos de ventas hardcodeados para prueba (incluyendo Nicolás Arguello)
// fetch('ventas.json') está comentado para usar datos locales
let ventas = [
    {
        "numero": 88,
        "nombre": "Nicolás Arguello",
        "dni": "454",
        "telefono": "3517656764"
    }
    // Agrega más participantes aquí si quieres, por ejemplo:
    // { "numero": 1, "nombre": "Otro Comprador", "dni": "123", "telefono": "1234567890" }
];

mostrarNumeros(); // Mostrar lista de números al cargar

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
