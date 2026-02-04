<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sorteo Altoke</title>
</head>
<body>
    <h1>¡Bienvenido al Sorteo de Altoke!</h1>
    <p>Ingresa tu nombre para participar:</p>
    <input type="text" id="nombre" placeholder="Tu nombre">
    <button onclick="participar()">Participar</button>
    <p id="resultado"></p>
    <script>
        function participar() {
            const nombre = document.getElementById('nombre').value;
            if (nombre) {
                document.getElementById('resultado').textContent = `¡Gracias, ${nombre}! Has sido registrado.`;
            } else {
                document.getElementById('resultado').textContent = 'Por favor, ingresa tu nombre.';
            }
        }
    </script>
</body>
</html>
