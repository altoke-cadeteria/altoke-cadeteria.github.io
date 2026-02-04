document.getElementById('sortearBtn').addEventListener('click', function() {
    // Genera un número aleatorio entre 1 y 250
    const numeroSorteado = Math.floor(Math.random() * 250) + 1;
    document.getElementById('numero').textContent = numeroSorteado;
});
