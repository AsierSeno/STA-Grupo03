document.getElementById('buscarBtn').addEventListener('click', function() {
    const titulo = document.getElementById('titulo').value;
    if (titulo === '') {
        document.getElementById('resultado').innerHTML = 'Por favor, introduce un título de película.';
        return;
    }

    const apiKey = 'd0865484'; // Sustituye TU_API_KEY con tu clave de la API de OMDb
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                document.getElementById('resultado').innerHTML = 'Película no encontrada.';
            } else {
                const director = data.Director;
                const year = data.Year;
                document.getElementById('resultado').innerHTML = `Director: ${director}<br>Año: ${year}`;
            }
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Hubo un error al buscar la película.';
            console.error('Error:', error);
        });
});
