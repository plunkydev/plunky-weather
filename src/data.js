import { render } from "./domRenderer.js"
const giphiApiKey = "Ka0KnVifxMeN2QhIf7amGnIfoRTY8VU0"
const keyApi = "aee6db3ecfc67b679ceccb6c1394c963"

const location = {
    latitud: 0,
    longitud: 0,
    city: "medellin",
}

const options = {
    method: "GET",
};

async function getWeather(currentLocation) {
    try {
        if (currentLocation.city){
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${keyApi}&query=${currentLocation.city}`, options)
            const data = await response.json()
            const datosFiltrados = {
                lugar: `${data.location.name} ${data.location.region}, ${data.location.country}`,
                icons: data.current.weather_icons,
                descripcion: data.current.weather_descriptions,
                temperatura: data.current.temperature,
                viento: data.current.wind_speed,
                presipitacion: data.current.precip,
                presion: data.current.pressure
            }
            getGif(data.current.weather_descriptions[0])
            render(datosFiltrados)
        } else {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${keyApi}&query=${currentLocation.latitud},${currentLocation.longitud}`, options)
            const data = await response.json()
            const datosFiltrados = {
                lugar: `${data.location.name} ${data.location.region}, ${data.location.country}`,
                icons: data.current.weather_icons,
                descripcion: data.current.weather_descriptions,
                temperatura: data.current.temperature,
                viento: data.current.wind_speed,
                presipitacion: data.current.precip,
                presion: data.current.pressure
            }
            getGif(data.current.weather_descriptions[0])
            render(datosFiltrados)
        }
    } catch (error) {
        if (error) {
            alert("Limite de consultas excedido por este mes")
    }
    }
}



// Obtener la ubicación del usuario---------------------------------------------------------

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            if (position) {
                const latitud =  position.coords.latitude;
                const longitud =  position.coords.longitude;
                location.latitud = latitud;
                location.longitud = longitud;
                getWeather(location)
            } else {
                getWeather(location)
                alert("No se pudo obtener la ubicación del usuario.");
            }
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

async function getGif(currentWeather) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphiApiKey}&q=${currentWeather}&limit=5`);
    const data = await response.json();
    let index = Math.floor(Math.random() * 5);
    const imageUrl = data.data[index].images['original'].url;
    const memeContainer = document.getElementById('memeContainerId');

    // Crear un elemento div para aplicar el fondo y el filtro
    const image = document.createElement("img");
    image.style.backgroundImage = `url(${imageUrl})`;
    image.style.backgroundSize = "cover";
    image.style.backgroundRepeat = "no-repeat";
    image.style.backgroundPosition = "center center";
    image.style.height = "100%";
    image.style.width = "100%";

    // Aplicar el filtro de color
    image.style.filter = "sepia(100%) hue-rotate(191deg)";

    // Añadir el div al memeContainer
    memeContainer.innerHTML = "";
    memeContainer.appendChild(image);
}

export { getWeather }
