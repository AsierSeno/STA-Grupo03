document.getElementById('buscarBtn').addEventListener('click', function() {
    const titulo = document.getElementById('titulo').value;
    
    // Verificación del campo de texto
    if (titulo === '') {
        document.getElementById('resultado').innerHTML = 'Por favor, introduce un título de película.';
        return;
    }

    // URL de la API con la clave y el título
    const apiKey = 'd0865484'; // Sustituye TU_API_KEY con tu clave de la API de OMDb
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                document.getElementById('resultado').innerHTML = 'Película no encontrada.';
                document.getElementById('portada').innerHTML = ''; // Limpiar imagen si no se encuentra película
            } else {
                // Mostrar todos los datos de la película excepto el póster
                const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, imdbRating } = data;
                
                document.getElementById('resultado').innerHTML = `
                    <strong>Título:</strong> ${Title}<br>
                    <strong>Año:</strong> ${Year}<br>
                    <strong>Clasificación:</strong> ${Rated}<br>
                    <strong>Estreno:</strong> ${Released}<br>
                    <strong>Duración:</strong> ${Runtime}<br>
                    <strong>Género:</strong> ${Genre}<br>
                    <strong>Director:</strong> ${Director}<br>
                    <strong>Guionista:</strong> ${Writer}<br>
                    <strong>Actores:</strong> ${Actors}<br>
                    <strong>Trama:</strong> ${Plot}<br>
                    <strong>Idioma:</strong> ${Language}<br>
                    <strong>País:</strong> ${Country}<br>
                    <strong>Premios:</strong> ${Awards}<br>
                    <strong>IMDb Rating:</strong> ${imdbRating}
                `;

                // Mostrar el póster en el div "portada"
                const poster = data.Poster !== "N/A" ? `<img src="${data.Poster}" alt="Póster de ${Title}" width="300">` : 'Póster no disponible';
                document.getElementById('portada').innerHTML = poster;
            }
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Hubo un error al buscar la película.';
            console.error('Error:', error);
        });
});
