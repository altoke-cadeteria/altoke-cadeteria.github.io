<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sorteo de Moto - Al Toke</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f8f9fa; font-family: Arial, sans-serif; }
        .numero { width: 60px; height: 60px; margin: 5px; display: inline-block; text-align: center; line-height: 60px; border-radius: 10px; font-weight: bold; cursor: pointer; transition: transform 0.2s; }
        .numero:hover { transform: scale(1.1); }
        .disponible { background-color: #28a745; color: white; }
        .vendido { background-color: #dc3545; color: white; }
        .logo { max-width: 200px; margin-bottom: 20px; }
        .sorteo { display: none; } /* Oculto hasta que todos estén vendidos */
        .contador { font-size: 1.2em; font-weight: bold; color: #007bff; }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="text-center">
            <img src="https://imgur.com/wYy2yZe" alt="Logo Cadetería Al Toke" class="logo">
            <h1>Sorteo de Moto - Cadetería Al Toke</h1>
            <p>¡Participá en el sorteo de una moto para apoyar a tu cadetería favorita! 250 números a $15,000 ARS cada uno. Comprá contactándonos directamente por efectivo o transferencia.</p>
            <p class="contador" id="contador">Números vendidos: 0/250</p>
        </div>

        <h2>Números Disponibles</h2>
        <p>Haz clic en un número vendido para ver el nombre (solo público).</p>
        <div id="numeros" class="text-center"></div>

        <h2 class="mt-5">Verificar Número</h2>
        <form id="verificarForm" class="mb-5">
            <div class="row">
                <div class="col-md-3">
                    <input type="number" id="numeroInput" class="form-control" placeholder="Número (1-250)" min="1" max="250" required>
                </div>
                <div class="col-md-3">
                    <input type="text" id="nombreInput" class="form-control" placeholder="Tu nombre completo" required>
                </div>
                <div class="col-md-3">
                    <input type="text" id="dniInput" class="form-control" placeholder="Tu DNI (para verificación)" required>
                </div>
                <div class="col-md-3">
                    <button type="submit" class="btn btn-primary">Verificar</button>
                </div>
            </div>
        </form>
        <div id="resultado" class="alert" style="display:none;"></div>

        <div id="sorteo" class="sorteo text-center mt-5">
            <h2>¡Sorteo!</h2>
            <p>Una vez vendidos todos los números, el sorteo se activa automáticamente.</p>
            <button id="sortearBtn" class="btn btn-success btn-lg">Sortear Ganador</button>
            <div id="proceso" style="display:none;">
                <p>Seleccionando ganador aleatoriamente...</p>
                <div id="ruleta" class="mt-3" style="font-size: 2em; color: #007bff;"></div>
            </div>
            <div id="ganador" style="display:none;">
                <h3>¡Felicidades al Ganador!</h3>
                <p id="numeroGanador"></p>
            </div>
        </div>

        <h2 class="mt-5">Términos y Condiciones</h2>
        <ul>
            <li>El sorteo se realiza una vez vendidos los 250 números.</li>
            <li>Si no se venden todos, el sorteo caduca y se devuelve el dinero a quienes presenten comprobante de identidad (DNI) que coincida con los datos registrados.</li>
            <li>Compras solo por contacto directo. No se aceptan pagos en la página.</li>
            <li>Protección contra fraudes: Verificación requiere nombre y DNI. Cualquier irregularidad será reportada.</li>
            <li>El ganador se elige aleatoriamente entre los números vendidos. El proceso es transparente y se muestra aquí.</li>
        </ul>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Datos de ejemplo (reemplaza con tu JSON real: nombre, dni, telefono)
        const datos = {
            "1": {"nombre": "Juan Pérez", "dni": "12345678", "telefono": "123456789"},
            "2": {"nombre": "María García", "dni": "87654321", "telefono": "987654321"},
            // Agrega más manualmente aquí...
        };

        const totalNumeros = 250;
        let vendidos = Object.keys(datos).length;

        // Actualizar contador
        document.getElementById('contador').textContent = `Números vendidos: ${vendidos}/${totalNumeros}`;

        // Mostrar números
        const container = document.getElementById('numeros');
        for (let i = 1; i <= totalNumeros; i++) {
            const div = document.createElement('div');
            div.className = 'numero';
            if (datos[i]) {
                div.classList.add('vendido');
                div.textContent = `${i}`;
                div.title = `Vendido a: ${datos[i].nombre}`; // Tooltip para ver nombre al pasar mouse
            } else {
                div.classList.add('disponible');
                div.textContent = i;
            }
            container.appendChild(div);
        }

        // Verificación (ahora incluye DNI para más seguridad)
        document.getElementById('verificarForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const numero = document.getElementById('numeroInput').value;
            const nombre = document.getElementById('nombreInput').value.trim().toLowerCase();
            const dni = document.getElementById('dniInput').value.trim();
            const resultado = document.getElementById('resultado');
            if (datos[numero] && datos[numero].nombre.toLowerCase() === nombre && datos[numero].dni === dni) {
                resultado.className = 'alert alert-success';
                resultado.textContent = '¡Verificado! Tu nombre y DNI coinciden. ¡Buena suerte!';
            } else {
                resultado.className = 'alert alert-danger';
                resultado.textContent = 'No coincide. Verifica tus datos o contactanos.';
            }
            resultado.style.display = 'block';
        });

        // Sorteo (solo si todos vendidos)
        if (vendidos === totalNumeros) {
            document.getElementById('sorteo').style.display = 'block';
        }
        document.getElementById('sortearBtn').addEventListener('click', function() {
            const proceso = document.getElementById('proceso');
            const ruleta = document.getElementById('ruleta');
            proceso.style.display = 'block';
            ruleta.innerHTML = '';
            // Animación de ruleta: muestra números aleatorios girando
            let interval = setInterval(() => {
                const num = Math.floor(Math.random() * totalNumeros) + 1;
                ruleta.textContent = `Número: ${num}`;
            }, 100);
            setTimeout(() => {
                clearInterval(interval);
                const ganador = Math.floor(Math.random() * totalNumeros) + 1;
                document.getElementById('numeroGanador').textContent = `Número ganador: ${ganador} - ${datos[ganador].nombre}`;
                proceso.style.display = 'none';
                document.getElementById('ganador').style.display = 'block';
            }, 3000); // 3 segundos de animación
        });
    </script>
</body>
</html>
