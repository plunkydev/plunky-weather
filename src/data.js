const giphiApiKey = "Ka0KnVifxMeN2QhIf7amGnIfoRTY8VU0"
const keyApi = "0351861a5dca300b32e11fa9761d7e1c"

const location = {
    latitud: 0,
    longitud: 0,
    city: "medellin",
}

const options = {
    method: "GET",
};

export async function getWeather(currentLocation) {
    if (location.city){
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${keyApi}&query=${currentLocation.city}`, options)
        const data = await response.json()
        console.log(data)
        const datosFiltrados = {
            lugar: `${data.location.name} ${data.location.region}, ${data.location.country}`,
            icons: data.current.weather_icons,
            descripcion: data.current.weather_descriptions,
            temperatura: data.current.temperature,
            viento: data.current.wind_speed,
            presipitacion: data.current.precip,
            precion: data.current.pressure
        }
        console.log(datosFiltrados)
        getGif(data.current.weather_descriptions[0])
    } else {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${keyApi}&query=${currentLocation.latitud},${currentLocation.longitud}`, options)
        const data = await response.json()
        const datosFiltrados = {
            lugar: `${data.location.name} ${data.location.region}, ${data.location.country}`,
            icons: data.current.weather_icons[0],
            descripcion: data.current.weather_descriptions,
            temperatura: data.current.temperature,
            viento: data.current.wind_speed,
            presipitacion: data.current.precip,
            precion: data.current.pressure
        }
        console.log(datosFiltrados)
        getGif(data.current.weather_descriptions[0])
    }
}

// Obtener la ubicación del usuario---------------------------------------------------------

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitud =  position.coords.latitude;
            const longitud =  position.coords.longitude;
            location.latitud = latitud;
            location.longitud = longitud;
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Tu navegador ha denegado la solicitud de ubicación. Permite que las aplicaciones accedan a tu ubicación.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Información de ubicación no disponible.");
                    break;
                case error.TIMEOUT:
                    alert("La solicitud de ubicación ha expirado.");
                    break;
                default:
                    alert("Error desconocido al obtener la ubicación.");
                    break;
            }
        }
    );
} else {
    alert("Tu navegador no soporta Geolocalización.");
}


getWeather(location)



export async function getGif(currentWeather) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphiApiKey}&q=${currentWeather}&limit=5`);
    const data = await response.json();
    let index = Math.floor(Math.random() * 5);
    const imageUrl = data.data[index].images['original'].url;

    // Crear un elemento div para aplicar el fondo y el filtro
    const backgroundDiv = document.createElement('div');
    backgroundDiv.style.backgroundImage = `url(${imageUrl})`;
    backgroundDiv.style.backgroundSize = "cover";
    backgroundDiv.style.backgroundRepeat = "no-repeat";
    backgroundDiv.style.backgroundPosition = "center center";
    backgroundDiv.style.backgroundAttachment = "fixed";
    backgroundDiv.style.height = "100vh";
    backgroundDiv.style.width = "100vw";

    // Aplicar el filtro de color
    backgroundDiv.style.filter = "sepia(100%) hue-rotate(191deg) blur(7px)";

    // Asegurarse de que el div cubra todo el cuerpo y esté detrás del contenido
    backgroundDiv.style.position = "fixed";
    backgroundDiv.style.top = "0";
    backgroundDiv.style.left = "0";
    backgroundDiv.style.zIndex = "-1";

    // Añadir el div al body
    document.body.appendChild(backgroundDiv);
}

